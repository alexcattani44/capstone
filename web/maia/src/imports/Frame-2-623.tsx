import imgImage from "figma:asset/2449f51e7f425604f205a4cb30c1289825ad0adf.png";

function Background() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[7px] shrink-0 size-[28px]" data-name="Background" style={{ backgroundImage: "linear-gradient(135deg, rgb(79, 195, 247) 0%, rgb(129, 212, 250) 100%)" }}>
      <div className="flex flex-col font-['Fraunces:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0b0f14] text-[14px] text-center tracking-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <p className="leading-[normal]">O</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(79,195,247,0.15)] content-stretch flex flex-col items-start px-[7px] py-[2px] relative rounded-[4px] shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#4fc3f7] text-[9px] tracking-[1.5px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Prototype</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[6px] relative shrink-0" data-name="Margin">
      <Overlay />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative">
        <Background />
        <div className="flex flex-col font-['Fraunces:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[20px] tracking-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
          <p className="leading-[normal]">OpenMAIA</p>
        </div>
        <Margin />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Open-Source Mammography AI Assistant</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#2a3544] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">|</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">v0.1.0</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center relative">
        <Container2 />
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[rgba(11,15,20,0.95)] content-stretch flex h-[56px] items-center justify-between pb-px px-[32px] relative shrink-0 w-[1440px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#2a3544] border-b border-solid inset-0 pointer-events-none" />
      <Container />
      <Container1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] tracking-[1.8px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Image</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">patient_0472_MLO.dcm</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">DICOM · 3328 × 4096 · 16-bit</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(79,195,247,0.15)] relative rounded-[8px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[#4fc3f7] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[15px] py-[11px] relative w-full">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative w-full">
        <Container7 />
        <OverlayBorder />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] tracking-[1.8px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">DICOM Metadata</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Patient ID</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">P-04728</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Modality</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">MG</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Laterality</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Left</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">View</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">MLO</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Image Size</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">3328 × 4096</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Bit Depth</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">16-bit</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[14px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container29 />
      <Container30 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#141a23] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[5px] items-start px-[12px] py-[10px] relative w-full">
        <Container13 />
        <Container16 />
        <Container19 />
        <Container22 />
        <Container25 />
        <Container28 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative w-full">
        <Container12 />
        <Background1 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] tracking-[1.8px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Display Controls</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[11px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Confidence Threshold</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#1c2430] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[2px]" data-name="Background">
      <div className="absolute bg-[#4fc3f7] bottom-0 left-0 right-1/2 rounded-[2px] top-0" data-name="Background" />
      <div className="absolute bg-white border-2 border-[#4fc3f7] border-solid left-[105.5px] rounded-[6px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.3)] size-[12px] top-[-4px]" data-name="Background+Border+Shadow" />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-end min-w-[32px] pl-[5.09px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#4fc3f7] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">0.50</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Background2 />
      <Container35 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Container34 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[11px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Heatmap Intensity</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#1c2430] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[2px]" data-name="Background">
      <div className="absolute bg-[#4fc3f7] inset-[0_40%_0_0] rounded-[2px]" data-name="Background" />
      <div className="absolute bg-white border-2 border-[#4fc3f7] border-solid left-[127.8px] rounded-[6px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.3)] size-[12px] top-[-4px]" data-name="Background+Border+Shadow" />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-end min-w-[32px] pl-[5.3px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#4fc3f7] text-[12px] text-right whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">0.60</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Background3 />
      <Container38 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start pt-[2px] relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container37 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Show Bounding Boxes</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#4fc3f7] h-[20px] relative rounded-[10px] shrink-0 w-[36px]" data-name="Background">
      <div className="absolute bg-white right-[3px] rounded-[7px] size-[14px] top-[3px]" data-name="Background" />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex items-center justify-between py-[5px] relative shrink-0 w-full" data-name="Container">
      <Container41 />
      <Background4 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Show Heatmap Overlay</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#4fc3f7] h-[20px] relative rounded-[10px] shrink-0 w-[36px]" data-name="Background">
      <div className="absolute bg-white right-[3px] rounded-[7px] size-[14px] top-[3px]" data-name="Background" />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex items-center justify-between py-[5px] relative shrink-0 w-full" data-name="Container">
      <Container43 />
      <Background5 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Show Confidence Labels</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#4fc3f7] h-[20px] relative rounded-[10px] shrink-0 w-[36px]" data-name="Background">
      <div className="absolute bg-white right-[3px] rounded-[7px] size-[14px] top-[3px]" data-name="Background" />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex items-center justify-between py-[5px] relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <Background6 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Container42 />
      <Container44 />
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative w-full">
        <Container32 />
        <Container33 />
        <Container36 />
        <Container39 />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] tracking-[1.8px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">EHR Data</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] tracking-[0.6px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Age</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#1c2430] relative rounded-[5px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[normal]">56</p>
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] items-start left-0 right-[134.5px] top-0" data-name="Container">
      <Label2 />
      <BackgroundBorder />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] tracking-[0.6px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Density</p>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#1c2430] relative rounded-[5px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[normal]">C – Heterogeneous</p>
        </div>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] items-start left-[134.5px] right-0 top-0" data-name="Container">
      <Label3 />
      <BackgroundBorder1 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] tracking-[0.6px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Prior Biopsy</p>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#1c2430] relative rounded-[5px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[normal]">No</p>
        </div>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] items-start left-0 right-[134.5px] top-[48px]" data-name="Container">
      <Label4 />
      <BackgroundBorder2 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] tracking-[0.6px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Family Hx</p>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#1c2430] relative rounded-[5px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex flex-col items-start px-[9px] py-[7px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[normal]">Yes</p>
        </div>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] items-start left-[134.5px] right-0 top-[48px]" data-name="Container">
      <Label5 />
      <BackgroundBorder3 />
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[90px] relative shrink-0 w-full" data-name="Container">
      <Container49 />
      <Container50 />
      <Container51 />
      <Container52 />
    </div>
  );
}

function Container46() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative w-full">
        <Container47 />
        <Container48 />
      </div>
    </div>
  );
}

function OverlayBorder1() {
  return (
    <div className="bg-[rgba(255,183,77,0.06)] relative rounded-[8px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(255,183,77,0.15)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[11px] py-[9px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#ffb74d] text-[0px] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="mb-0">
            <span className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[14px]" style={{ fontVariationSettings: "'opsz' 9" }}>{`⚠ `}</span>
            <span className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[14px]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Research Prototype.
            </span>
            <span className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[14px]" style={{ fontVariationSettings: "'opsz' 9" }}>{` Not for clinical diagnosis.`}</span>
          </p>
          <p className="leading-[14px]" style={{ fontVariationSettings: "'opsz' 9" }}>
            Does not replace professional medical judgment.
          </p>
        </div>
      </div>
    </div>
  );
}

function LeftPanel() {
  return (
    <div className="h-full relative shrink-0 w-[300px]" data-name="LEFT PANEL">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pl-[18px] pr-[19px] py-[18px] relative size-full">
          <Container6 />
          <Container11 />
          <Container31 />
          <Container46 />
          <OverlayBorder1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#2a3544] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(79,195,247,0.15)] content-stretch flex flex-col items-center justify-center px-[12px] py-[5px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#4fc3f7] text-[10.5px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Analysis View</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-[5px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#8899ab] text-[10.8px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Original</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-[5px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#8899ab] text-[10.7px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Heatmap Only</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3px] items-start relative">
        <Button />
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[normal]">patient_0472_MLO.dcm</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 pb-[11px] pt-[10px] px-[20px] right-0 top-0" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#2a3544] border-b border-solid inset-0 pointer-events-none" />
      <Container53 />
      <Container54 />
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[13px] relative shrink-0 w-[175.42px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute bg-[#66bb6a] left-0 rounded-[2.5px] size-[5px] top-[5px]" data-name="Background" />
        <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal h-[13px] justify-center leading-[0] left-[10px] text-[#8899ab] text-[10px] top-[6.5px] w-[166.134px]" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[normal]">Analysis Complete — CPU Inference</p>
        </div>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[normal]">Inference: 1.84s · 3 detections</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 pb-[8px] pt-[9px] px-[20px] right-0 top-[814px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#2a3544] border-solid border-t inset-0 pointer-events-none" />
      <Container55 />
      <Container56 />
    </div>
  );
}

function Image() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[12px] w-full" data-name="image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage} />
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col h-[540px] items-start justify-center overflow-clip relative rounded-[12px] shrink-0 w-[420px]" data-name="Container">
      <Image />
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[43px_0_30px_0] items-center px-[20px] py-[115.5px]" data-name="Container">
      <Container58 />
    </div>
  );
}

function CenterPanel() {
  return (
    <div className="h-full relative shrink-0 w-[830px]" data-name="CENTER PANEL">
      <HorizontalBorder />
      <HorizontalBorder1 />
      <Container57 />
    </div>
  );
}

function Heading() {
  return (
    <div className="relative shrink-0" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] tracking-[0.8px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Detection</p>
        </div>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(239,83,80,0.12)] relative rounded-[20px] shrink-0" data-name="Overlay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[12px] py-[2px] relative">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#ef5350] text-[9px] tracking-[0.5px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">2 Found</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#2a3544] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[108.19px] items-center pb-[11px] pt-[10px] px-[14px] relative w-full">
          <Heading />
          <Overlay1 />
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Mass</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Malignant · IoU 0.78</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container61 />
        <Container62 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#ef5350] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">92%</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder3() {
  return (
    <div className="content-stretch flex gap-[10px] items-center pb-[8px] pt-[7px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(42,53,68,0.4)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-[#ef5350] rounded-[4px] shrink-0 size-[8px]" data-name="Background" />
      <Container60 />
      <Container63 />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Calcification</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Benign · IoU 0.63</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container66 />
      <Container67 />
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#4fc3f7] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">67%</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex gap-[10px] items-center py-[7px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#4fc3f7] rounded-[4px] shrink-0 size-[8px]" data-name="Background" />
      <Container65 />
      <Container68 />
    </div>
  );
}

function Container59() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[14px] py-[12px] relative w-full">
        <HorizontalBorder3 />
        <Container64 />
      </div>
    </div>
  );
}

function Detection() {
  return (
    <div className="bg-[#141a23] relative rounded-[12px] shrink-0 w-full" data-name="Detection">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <HorizontalBorder2 />
        <Container59 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Heading1() {
  return (
    <div className="relative shrink-0" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] tracking-[0.8px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Classification</p>
        </div>
      </div>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(239,83,80,0.12)] relative rounded-[20px] shrink-0" data-name="Overlay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[12px] py-[2px] relative">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#ef5350] text-[9px] tracking-[0.5px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Review</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder4() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#2a3544] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[81.7px] items-center pb-[11px] pt-[10px] px-[14px] relative w-full">
          <Heading1 />
          <Overlay2 />
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex items-baseline justify-between leading-[0] left-[14px] right-[14px] text-[#e8ecf1] top-[12px] whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center relative shrink-0 text-[12px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Suspicious — Malignant</p>
      </div>
      <div className="flex flex-col font-['Fraunces:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[18px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <p className="leading-[normal]">87.0%</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="absolute bg-[#1c2430] h-[5px] left-[14px] overflow-clip right-[14px] rounded-[3px] top-[40px]" data-name="Background">
      <div className="absolute bg-gradient-to-r from-[#ffb74d] inset-[0_13%_0_0] rounded-[3px] to-[#ef5350]" data-name="Gradient" />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Benign</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Malignant</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute content-stretch flex h-[12px] items-start justify-between left-[14px] right-[14px] top-[48px]" data-name="Container">
      <Container71 />
      <Container72 />
    </div>
  );
}

function BackgroundVerticalBorder() {
  return (
    <div className="absolute bg-[#1c2430] content-stretch flex flex-col items-start left-[14px] pl-[13px] pr-[10px] py-[9px] right-[14px] rounded-[8px] top-[68px]" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#4fc3f7] border-l-3 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[0px] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">
          <span className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[15px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Grad-CAM Insight:
          </span>
          <span className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[15px]" style={{ fontVariationSettings: "'opsz' 9" }}>{` Model focused on the`}</span>
        </p>
        <p className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[15px] mb-0" style={{ fontVariationSettings: "'opsz' 9" }}>
          upper-left quadrant showing an irregular mass
        </p>
        <p className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[15px] mb-0" style={{ fontVariationSettings: "'opsz' 9" }}>
          with spiculated margins. Confidence driven by
        </p>
        <p className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[15px]" style={{ fontVariationSettings: "'opsz' 9" }}>
          tissue density and mass morphology.
        </p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[158px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph />
        <Background7 />
        <Container70 />
        <BackgroundVerticalBorder />
      </div>
    </div>
  );
}

function Classification() {
  return (
    <div className="bg-[#141a23] relative rounded-[12px] shrink-0 w-full" data-name="Classification">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <HorizontalBorder4 />
        <Container69 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] tracking-[0.8px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">5-Year Risk</p>
        </div>
      </div>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[rgba(255,183,77,0.12)] relative rounded-[20px] shrink-0" data-name="Overlay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] py-[2px] relative">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#ffb74d] text-[9px] tracking-[0.5px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Elevated</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder5() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#2a3544] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[11px] pt-[10px] px-[14px] relative w-full">
          <Heading2 />
          <Overlay3 />
        </div>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[70px] overflow-clip relative rounded-tl-[70px] rounded-tr-[70px] shrink-0 w-[140px]" data-name="Container">
      <div className="-translate-x-1/2 absolute bg-[#141a23] bottom-0 h-[50px] left-1/2 rounded-tl-[50px] rounded-tr-[50px] w-[100px]" data-name="Background" />
      <div className="-translate-x-1/2 absolute bottom-[-0.12px] flex h-[55.826px] items-center justify-center left-[calc(50%-3.42px)] w-[8.81px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-7 flex-none">
          <div className="bg-white h-[56px] rounded-[1px] shadow-[0px_0px_6px_0px_rgba(255,255,255,0.3)] w-[2px]" data-name="Vertical Divider" />
        </div>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute bottom-[7px] content-stretch flex flex-col items-start left-[89.55px]" data-name="Container">
      <div className="flex flex-col font-['Fraunces:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[22px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <p className="leading-[normal]">18.4%</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex h-[90px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container75 />
      <Container76 />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] tracking-[0.8px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Low</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] tracking-[0.8px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Moderate</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[9px] tracking-[0.8px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">High</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Container78 />
        <Container79 />
        <Container80 />
      </div>
    </div>
  );
}

function BackgroundVerticalBorder1() {
  return (
    <div className="bg-[#1c2430] relative rounded-[8px] shrink-0 w-full" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#4fc3f7] border-l-3 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start pb-[9px] pl-[13px] pr-[10px] pt-[15px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[0px] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">
            <span className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[15px]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Assessment:
            </span>
            <span className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[15px]" style={{ fontVariationSettings: "'opsz' 9" }}>{` Estimated 5-year invasive breast`}</span>
          </p>
          <p className="mb-0">
            <span className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[15px]" style={{ fontVariationSettings: "'opsz' 9" }}>{`cancer risk is `}</span>
            <span className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[15px]" style={{ fontVariationSettings: "'opsz' 14" }}>
              18.4%
            </span>
            <span className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[15px]" style={{ fontVariationSettings: "'opsz' 9" }}>{` (elevated).`}</span>
          </p>
          <p className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[15px] mb-0" style={{ fontVariationSettings: "'opsz' 9" }}>
            Heterogeneously dense breast tissue and
          </p>
          <p className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[15px]" style={{ fontVariationSettings: "'opsz' 9" }}>
            family history factored into this estimate.
          </p>
        </div>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start pb-[12px] pt-[16px] px-[14px] relative w-full">
        <Container74 />
        <Container77 />
        <BackgroundVerticalBorder1 />
      </div>
    </div>
  );
}

function Risk() {
  return (
    <div className="bg-[#141a23] relative rounded-[12px] shrink-0 w-full" data-name="Risk">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <HorizontalBorder5 />
        <Container73 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[11px] tracking-[0.8px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Model Info</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder6() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#2a3544] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[11px] pt-[10px] px-[14px] relative w-full">
          <Heading3 />
        </div>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Detection</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">YOLOv8n (4.2 MB)</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[13px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Container83 />
        <Container84 />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Classifier</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">EfficientNet-B0</p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex h-[13px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container86 />
      <Container87 />
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Risk Model</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">CNN + EHR Fusion</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[13px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Container89 />
        <Container90 />
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Dataset</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">CBIS-DDSM</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex h-[13px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container92 />
      <Container93 />
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Input Size</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">640 × 640 px</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex h-[13px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container95 />
      <Container96 />
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Compute</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">CPU Only</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="h-[13px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Container98 />
        <Container99 />
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="relative shrink-0 w-[243px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative w-full">
        <Container82 />
        <Container85 />
        <Container88 />
        <Container91 />
        <Container94 />
        <Container97 />
      </div>
    </div>
  );
}

function ModelInfo() {
  return (
    <div className="bg-[#141a23] relative rounded-[12px] shrink-0 w-full" data-name="Model Info">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-center overflow-clip pb-[13px] pt-px px-px relative rounded-[inherit] w-full">
        <HorizontalBorder6 />
        <Container81 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function RightPanel() {
  return (
    <div className="h-full relative shrink-0 w-[310px]" data-name="RIGHT PANEL">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[14px] items-start pl-[19px] pr-[18px] py-[18px] relative size-full">
          <Detection />
          <Classification />
          <Risk />
          <ModelInfo />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#2a3544] border-l border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[844px] items-start justify-center relative shrink-0 w-[1440px]" data-name="Container">
      <LeftPanel />
      <CenterPanel />
      <RightPanel />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Frame" style={{ backgroundImage: "linear-gradient(90deg, rgb(11, 15, 20) 0%, rgb(11, 15, 20) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Header />
      <Container5 />
    </div>
  );
}