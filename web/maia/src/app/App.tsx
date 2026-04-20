import { useState, useEffect } from "react";
import dicomParser from "dicom-parser";
import { Header } from "./components/Header";
import { LeftPanel } from "./components/LeftPanel";
import { CenterPanel } from "./components/CenterPanel";
import { RightPanel } from "./components/RightPanel";
import {
  useMammogramAnalysis,
  type Detection,
} from "./utils/useMammogramAnalysis";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const LABEL_COLORS: Record<string, string> = {
  mass_malignant: "#EF5350",
  mass_benign: "#66BB6A",
  calc_malignant: "#FF7043",
  calc_benign: "#4FC3F7",
  mass_lesion: "#FFB74D",
  calc_lesion: "#FFB74D",
};

function labelToDisplayName(label: string): string {
  return label.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function labelToType(label: string): string {
  if (label.includes("malignant")) return "Malignant";
  if (label.includes("benign")) return "Benign";
  return "Suspicious";
}

function getColor(label: string): string {
  return LABEL_COLORS[label] || "#FFB74D";
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  // ---- Hook (top level — required by Rules of Hooks) ----
  const {
    analyze,
    result,
    loading: isAnalyzing,
    error: analysisError,
    progress,
    reset: resetAnalysis,
  } = useMammogramAnalysis();

  // ---- File / image state ----
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fileName, setFileName] = useState("No image loaded");

  // ---- DICOM metadata ----
  const [metadata, setMetadata] = useState([
    { label: "Patient ID", value: "—" },
    { label: "Modality", value: "—" },
    { label: "Laterality", value: "—" },
    { label: "View", value: "—" },
    { label: "Image Size", value: "—" },
    { label: "Bit Depth", value: "—" },
  ]);

  // ---- Display controls ----
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5);
  const [heatmapIntensity, setHeatmapIntensity] = useState(0.6);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showConfidenceLabels, setShowConfidenceLabels] = useState(true);

  // ---- EHR form ----
  const [age, setAge] = useState("");
  const [density, setDensity] = useState("");
  const [priorBiopsy, setPriorBiopsy] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");

  // ---- UI ----
  const [activeTab, setActiveTab] = useState<
    "analysis" | "original" | "heatmap"
  >("analysis");

  // ---------------------------------------------------------------
  // Derived state from the typed API result
  // ---------------------------------------------------------------

  const hasResults = result !== null;

  // Filter detections by current threshold
  const filteredDetections: Detection[] = result
    ? result.detections.filter((d) => d.confidence >= confidenceThreshold)
    : [];

  const detections = filteredDetections.map((d) => ({
    name: labelToDisplayName(d.label),
    type: labelToType(d.label),
    confidence: Math.round(d.confidence * 1000) / 10, // e.g. 94.2
    color: getColor(d.label),
    iou: 0,
    source: d.source,
  }));

  // Map to the shape your CenterPanel bounding box overlay expects
  const boundingBoxes = result
    ? filteredDetections.map((d) => ({
        x: d.x1 / result.width,
        y: d.y1 / result.height,
        width: (d.x2 - d.x1) / result.width,
        height: (d.y2 - d.y1) / result.height,
        label: labelToDisplayName(d.label),
        confidence: d.confidence,
        color: getColor(d.label),
      }))
    : [];

  // Classification card
  const classification = result
    ? {
        label:
          result.classification === "malignant"
            ? "Suspicious — Malignant"
            : result.classification === "benign"
              ? "Likely Benign"
              : result.classification === "suspicious"
                ? "Suspicious — Needs Review"
                : "Normal",
        confidence: result.classification_confidence,
        description:
          result.model_info.models_used.length > 0
            ? `Analysis by ${result.model_info.models_used.join(", ")}`
            : "No models available",
      }
    : undefined;

  // Risk gauge
  const risk =
    result && result.risk_score != null
      ? {
          level: result.risk_level ?? "average",
          percentage: Math.round(result.risk_score * 100 * 10) / 10,
          assessment: `Estimated 5-year invasive breast cancer risk is ${(result.risk_score * 100).toFixed(1)}% (${result.risk_level}).`,
        }
      : undefined;

  // Model info card
  const modelInfo = {
    detection: result?.model_info.models_used.find((m) => m.includes("yolo"))
      ? "YOLO11-s (ONNX)"
      : "—",
    classifier: result?.model_info.models_used.find((m) => m.includes("patch"))
      ? "EfficientNet-B0 (ONNX)"
      : "—",
    riskModel: "CNN + EHR Fusion",
    dataset: "CBIS-DDSM",
    inference: result
      ? `${(result.inference_time_ms / 1000).toFixed(2)}s`
      : "—",
    compute: result?.model_info.compute ?? "CPU Only",
  };

  // Status bar
  const inferenceStatus = result
    ? `Inference: ${(result.inference_time_ms / 1000).toFixed(2)}s · ${result.detections.length} detection(s)`
    : undefined;

  // ---------------------------------------------------------------
  // Update metadata when backend returns image dimensions
  // ---------------------------------------------------------------
  useEffect(() => {
    if (!result) return;
    setMetadata((prev) =>
      prev.map((m) =>
        m.label === "Image Size"
          ? { ...m, value: `${result.width} × ${result.height}` }
          : m,
      ),
    );
  }, [result]);

  // ---------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setFileName(file.name);
    resetAnalysis();

    const isDicom =
      file.name.toLowerCase().endsWith(".dcm") ||
      file.name.toLowerCase().endsWith(".dicom");

    if (isDicom) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const byteArray = new Uint8Array(arrayBuffer);
        const dataSet = dicomParser.parseDicom(byteArray);

        // Extract metadata
        const patientId = dataSet.string("x00100020") || "—";
        const modality = dataSet.string("x00080060") || "—";
        const laterality = dataSet.string("x00200062") || "—";
        const viewPosition = dataSet.string("x00185101") || "—";
        const rows = dataSet.uint16("x00280010") || 0;
        const cols = dataSet.uint16("x00280011") || 0;
        const bitsStored = dataSet.uint16("x00280101") || 0;

        setMetadata([
          { label: "Patient ID", value: patientId },
          { label: "Modality", value: modality },
          { label: "Laterality", value: laterality },
          { label: "View", value: viewPosition },
          { label: "Image Size", value: `${cols} × ${rows}` },
          { label: "Bit Depth", value: `${bitsStored}-bit` },
        ]);

        // Render pixel data to a canvas → blob URL
        const pixelDataElement = dataSet.elements.x7fe00010;
        if (pixelDataElement && rows && cols) {
          const pixelData = new Uint16Array(
            byteArray.buffer,
            pixelDataElement.dataOffset,
            rows * cols,
          );

          // Handle MONOCHROME1 (inverted)
          const photometric = dataSet.string("x00280004") || "";

          // Normalize to 0–255
          let min = Infinity,
            max = -Infinity;
          for (let i = 0; i < pixelData.length; i++) {
            if (pixelData[i] < min) min = pixelData[i];
            if (pixelData[i] > max) max = pixelData[i];
          }
          const range = max - min || 1;

          const canvas = document.createElement("canvas");
          canvas.width = cols;
          canvas.height = rows;
          const ctx = canvas.getContext("2d")!;
          const imageData = ctx.createImageData(cols, rows);

          for (let i = 0; i < pixelData.length; i++) {
            let val = ((pixelData[i] - min) / range) * 255;
            if (photometric === "MONOCHROME1") val = 255 - val;
            imageData.data[i * 4] = val;
            imageData.data[i * 4 + 1] = val;
            imageData.data[i * 4 + 2] = val;
            imageData.data[i * 4 + 3] = 255;
          }

          ctx.putImageData(imageData, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              setImageUrl(URL.createObjectURL(blob));
              setImageLoaded(true);
            }
          }, "image/png");
        }
      } catch (err) {
        console.error("DICOM parse error:", err);
        setImageLoaded(false);
      }
    } else {
      // Regular image (JPEG/PNG) — browser handles natively
      setImageUrl(URL.createObjectURL(file));
      setImageLoaded(true);
      setMetadata([
        { label: "Patient ID", value: "—" },
        { label: "Modality", value: "MG" },
        { label: "Laterality", value: "—" },
        { label: "View", value: "—" },
        { label: "Image Size", value: "—" },
        { label: "Bit Depth", value: "—" },
      ]);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setImageUrl("");
    setImageLoaded(false);
    setFileName("No image loaded");
    setMetadata([
      { label: "Patient ID", value: "—" },
      { label: "Modality", value: "—" },
      { label: "Laterality", value: "—" },
      { label: "View", value: "—" },
      { label: "Image Size", value: "—" },
      { label: "Bit Depth", value: "—" },
    ]);
    resetAnalysis();
  };

  const handleLoadDemo = () => {
    setImageLoaded(true);
    setImageUrl(
      "https://images.unsplash.com/photo-1698913464331-b71a8d32b4da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIweHJheSUyMGltYWdpbmd8ZW58MXx8fHwxNzczMzI1NTIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    );
    setFileName("patient_0472_MLO.dcm");
    setMetadata([
      { label: "Patient ID", value: "P-0478" },
      { label: "Modality", value: "MG" },
      { label: "Laterality", value: "Left" },
      { label: "View", value: "MLO" },
      { label: "Image Size", value: "3328 × 4096" },
      { label: "Bit Depth", value: "16-bit" },
    ]);
    setAge("56");
    setDensity("c");
    setPriorBiopsy("no");
    setFamilyHistory("yes");
    resetAnalysis();
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      console.warn("No file selected — upload a mammogram first");
      return;
    }

    const densityMap: Record<string, string> = {
      a: "A",
      b: "B",
      c: "C",
      d: "D",
    };

    analyze(selectedFile, {
      confidenceThreshold,
      useYolo: true,
      usePatch: true,
      patientAge: age ? parseInt(age, 10) : undefined,
      breastDensity: densityMap[density] || undefined,
      priorBiopsy: priorBiopsy === "yes",
      familyHistory: familyHistory === "yes",
    });
  };

  // ---------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------

  return (
    <div className="flex flex-col h-screen min-h-0 overflow-hidden bg-[var(--color-bg-dark)]">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-[340px] shrink-0">
          <LeftPanel
            metadata={metadata}
            confidenceThreshold={confidenceThreshold}
            heatmapIntensity={heatmapIntensity}
            showBoundingBoxes={showBoundingBoxes}
            showHeatmap={showHeatmap}
            showConfidenceLabels={showConfidenceLabels}
            age={age}
            density={density}
            priorBiopsy={priorBiopsy}
            familyHistory={familyHistory}
            onFileSelect={handleFileSelect}
            onClear={handleClear}
            onConfidenceThresholdChange={setConfidenceThreshold}
            onHeatmapIntensityChange={setHeatmapIntensity}
            onShowBoundingBoxesChange={setShowBoundingBoxes}
            onShowHeatmapChange={setShowHeatmap}
            onShowConfidenceLabelsChange={setShowConfidenceLabels}
            onAgeChange={setAge}
            onDensityChange={setDensity}
            onPriorBiopsyChange={setPriorBiopsy}
            onFamilyHistoryChange={setFamilyHistory}
            onAnalyze={handleAnalyze}
            onLoadDemo={handleLoadDemo}
            isAnalyzing={isAnalyzing}
          />
        </aside>

        <main className="flex-1 min-w-0 min-h-0 overflow-hidden">
          <CenterPanel
            activeTab={activeTab}
            onTabChange={setActiveTab}
            imageLoaded={imageLoaded}
            imageUrl={imageUrl}
            fileName={fileName}
            boundingBoxes={boundingBoxes}
            showBoundingBoxes={showBoundingBoxes && hasResults}
            showConfidenceLabels={showConfidenceLabels && hasResults}
            heatmapBase64={result?.heatmap_base64 ?? undefined}
            showHeatmap={showHeatmap && hasResults}
            heatmapIntensity={heatmapIntensity}
            inferenceTime={inferenceStatus}
            analysisError={analysisError ?? undefined}
            progress={isAnalyzing ? progress : undefined}
          />
        </main>

        <aside className="w-[340px] shrink-0">
          <RightPanel
            hasResults={hasResults}
            detections={detections}
            classification={classification}
            risk={risk}
            modelInfo={modelInfo}
          />
        </aside>
      </div>
    </div>
  );
}
