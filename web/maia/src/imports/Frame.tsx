function Background() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]" data-name="Background" style={{ backgroundImage: "linear-gradient(135deg, rgb(79, 195, 247) 0%, rgb(129, 212, 250) 100%)" }}>
      <div className="flex flex-col font-['Fraunces:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0b0f14] text-[16px] text-center tracking-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <p className="leading-[normal]">O</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(79,195,247,0.15)] content-stretch flex flex-col items-start px-[8px] py-[3px] relative rounded-[4px] shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#4fc3f7] text-[10px] tracking-[1.5px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Prototype</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[8px] relative shrink-0" data-name="Margin">
      <Overlay />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative">
        <Background />
        <div className="flex flex-col font-['Fraunces:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[22px] tracking-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
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
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Open-Source Mammography AI Assistant</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#2a3544] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">|</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">v0.1.0</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Container2 />
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(11,15,20,0.85)] h-[64px] shrink-0 sticky top-0 w-full z-[2]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#2a3544] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[1300.36px] items-center pb-px pl-[32px] pr-[31.99px] relative size-full">
          <Container />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] tracking-[1.8px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Image Upload</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[22px] right-[22px] top-[93px]" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Drop mammogram here</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[22px] right-[22px] top-[115px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[12px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Supports DICOM, PNG, JPEG</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#efefef] relative shrink-0" data-name="Input">
      <div className="content-stretch flex items-start justify-center overflow-clip px-[8px] py-[3px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12.8px] text-black text-center whitespace-nowrap">
          <p className="leading-[normal]">Choose File</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute content-stretch flex gap-[4px] inset-[2px] items-center opacity-0 overflow-clip pb-[140px]" data-name="Input">
      <Input1 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#e8ecf1] text-[12.5px] whitespace-nowrap">
        <p className="leading-[normal]">No file chosen</p>
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="h-[165px] relative rounded-[12px] shrink-0 w-full" data-name="Border">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Heading1 />
        <Container8 />
        <Input />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#2a3544] border-dashed inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative w-full">
        <Container7 />
        <Border />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] tracking-[1.8px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">DICOM Metadata</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Patient ID</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">—</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Modality</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">—</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Laterality</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">—</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">View</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">—</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Image Size</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">—</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Bit Depth</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">—</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#141a23] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[14px] relative w-full">
        <Container11 />
        <Container14 />
        <Container17 />
        <Container20 />
        <Container23 />
        <Container26 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative w-full">
        <Container10 />
        <Background1 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] tracking-[1.8px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Display Controls</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[12px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Confidence Threshold</p>
      </div>
    </div>
  );
}

function Container34() {
  return <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px" data-name="Container" />;
}

function Container33() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 right-0 top-[-6px]" data-name="Container">
      <Container34 />
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white flex-[1_0_0] h-[4px] min-h-px min-w-px relative" data-name="Input">
      <Container33 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-end min-w-[38px] pl-[8.86px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#4fc3f7] text-[13px] text-right whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">0.50</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Input2 />
      <Container35 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Container32 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[12px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Heatmap Intensity</p>
      </div>
    </div>
  );
}

function Container39() {
  return <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px" data-name="Container" />;
}

function Container38() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 right-[-0.08px] top-[-6px]" data-name="Container">
      <Container39 />
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white flex-[1_0_0] h-[4px] min-h-px min-w-px relative" data-name="Input">
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-end min-w-[38px] pl-[9.08px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#4fc3f7] text-[13px] text-right whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">0.60</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Input3 />
      <Container40 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start pt-[2px] relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container37 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Show Bounding Boxes</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#4fc3f7] h-[22px] relative rounded-[11px] shrink-0 w-[40px]" data-name="Background">
      <div className="absolute bg-white left-[21px] rounded-[8px] size-[16px] top-[3px]" data-name="Background" />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container43 />
      <Background2 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Show Heatmap Overlay</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#4fc3f7] h-[22px] relative rounded-[11px] shrink-0 w-[40px]" data-name="Background">
      <div className="absolute bg-white left-[21px] rounded-[8px] size-[16px] top-[3px]" data-name="Background" />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <Background3 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Show Confidence Labels</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#4fc3f7] h-[22px] relative rounded-[11px] shrink-0 w-[40px]" data-name="Background">
      <div className="absolute bg-white left-[21px] rounded-[8px] size-[16px] top-[3px]" data-name="Background" />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container47 />
      <Background4 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container44 />
      <Container46 />
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative w-full">
        <Container30 />
        <Container31 />
        <Container36 />
        <Container41 />
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] tracking-[1.8px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Optional EHR Data</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] tracking-[0.8px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Age</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[11px] overflow-clip right-[26px] top-[9px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#757575] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">e.g. 52</p>
      </div>
    </div>
  );
}

function Container54() {
  return <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px" data-name="Container" />;
}

function RectangleAlignStretch() {
  return (
    <div className="content-stretch flex h-full items-start relative shrink-0" data-name="Rectangle:align-stretch">
      <div className="h-full min-w-[15px] opacity-0 shrink-0 w-[15px]" data-name="Rectangle" />
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex items-center left-[11px] right-[11px] top-[9px]" data-name="Container">
      <Container54 />
      <div className="flex flex-row items-center self-stretch">
        <RectangleAlignStretch />
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[#1c2430] h-[34px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container52 />
        <Container53 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3px] items-start left-0 pb-[2px] right-[132px] top-0" data-name="Container">
      <Label2 />
      <Input4 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] tracking-[0.8px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Density</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[16px]">—</p>
        </div>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-[#1c2430] relative rounded-[6px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[15px] pr-[27px] py-[9px] relative w-full">
          <Container56 />
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3px] items-start left-[167px] right-[-34px] top-0" data-name="Container">
      <Label3 />
      <Options />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] tracking-[0.8px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Prior Biopsy</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[16px]">—</p>
        </div>
      </div>
    </div>
  );
}

function Options1() {
  return (
    <div className="bg-[#1c2430] relative rounded-[6px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[15px] pr-[27px] py-[9px] relative w-full">
          <Container58 />
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3px] items-start left-0 right-[132px] top-[60px]" data-name="Container">
      <Label4 />
      <Options1 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[10px] tracking-[0.8px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[normal]">Family Hx</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[12px] w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[16px]">—</p>
        </div>
      </div>
    </div>
  );
}

function Options2() {
  return (
    <div className="bg-[#1c2430] relative rounded-[6px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[15px] pr-[27px] py-[9px] relative w-full">
          <Container60 />
        </div>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3px] items-start left-[167px] right-[-34px] top-[60px]" data-name="Container">
      <Label5 />
      <Options2 />
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[112px] relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <Container55 />
      <Container57 />
      <Container59 />
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative w-full">
        <Container49 />
        <Container50 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="opacity-40 relative rounded-[8px] shrink-0 w-full" data-name="Button" style={{ backgroundImage: "linear-gradient(135deg, rgb(79, 195, 247) 0%, rgb(41, 182, 246) 100%)" }}>
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[14px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0b0f14] text-[14px] text-center tracking-[0.3px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[normal]">Analyze Mammogram</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1c2430] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#2a3544] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[11px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[normal]">Load Demo Image</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(255,183,77,0.08)] h-[76px] relative rounded-[8px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(255,183,77,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[13px] relative size-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal h-[51px] justify-center leading-[0] relative shrink-0 text-[#ffb74d] text-[0px] w-[262px]" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="text-[11px]">
            <span className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[16.5px]" style={{ fontVariationSettings: "'opsz' 9" }}>{`⚠ `}</span>
            <span className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[16.5px]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Research Prototype.
            </span>
            <span className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[16.5px]" style={{ fontVariationSettings: "'opsz' 9" }}>{` This tool is not ready for clinical diagnosis.`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function LeftPanel() {
  return (
    <div className="absolute inset-[0_1580px_0_0] max-h-[1136px]" data-name="LEFT PANEL">
      <div className="content-stretch flex flex-col gap-[20px] items-start max-h-[inherit] overflow-auto pl-[24px] pr-[25px] py-[24px] relative size-full">
        <Container6 />
        <Container9 />
        <Container29 />
        <Container48 />
        <Button />
        <Button1 />
        <OverlayBorder />
      </div>
      <div aria-hidden="true" className="absolute border-[#2a3544] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container62() {
  return <div className="h-[36px] shrink-0 w-full" data-name="Container" />;
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[normal] relative shrink-0 text-[#8899ab] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Analysis results will appear here after</p>
        <p>processing</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="opacity-40 relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start py-[40px] relative w-full">
        <Container62 />
        <Container63 />
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="absolute inset-[0_0_0_1580px] max-h-[1136px]" data-name="RIGHT PANEL">
      <div className="content-stretch flex flex-col items-start max-h-[inherit] overflow-auto pl-[25px] pr-[24px] py-[24px] relative size-full">
        <Container61 />
      </div>
      <div aria-hidden="true" className="absolute border-[#2a3544] border-l border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(79,195,247,0.15)] content-stretch flex flex-col items-center justify-center px-[14px] py-[6px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#4fc3f7] text-[11.4px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Analysis View</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[14px] py-[6px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#8899ab] text-[11.8px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Original</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[14px] py-[6px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#8899ab] text-[11.6px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Heatmap Only</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start relative">
        <Button2 />
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[normal]">No image loaded</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 pb-[13px] pt-[12px] px-[24px] right-0 top-0" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#2a3544] border-b border-solid inset-0 pointer-events-none" />
      <Container64 />
      <Container65 />
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[14px] relative shrink-0 w-[171.52px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute bg-[#66bb6a] left-0 rounded-[3px] size-[6px] top-[5px]" data-name="Background" />
        <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal h-[14px] justify-center leading-[0] left-[12px] text-[#8899ab] text-[11px] top-[7px] w-[160.092px]" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[normal]">System Ready — CPU Inference</p>
        </div>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[normal]">—</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 pb-[10px] pt-[11px] px-[24px] right-0 top-[1101px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#2a3544] border-solid border-t inset-0 pointer-events-none" />
      <Container66 />
      <Container67 />
    </div>
  );
}

function Container70() {
  return <div className="absolute h-[64px] left-0 right-0 top-0" data-name="Container" />;
}

function Heading() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-[99px]" data-name="Heading 2">
      <div className="flex flex-col font-['Fraunces:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#e8ecf1] text-[20px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        <p className="leading-[normal]">No Image Loaded</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-[130px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#8899ab] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[normal]">Upload a mammogram or load the demo to begin</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[147px] opacity-50 relative shrink-0 w-[296.28px]" data-name="Container">
      <Container70 />
      <Heading />
      <Container71 />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[51px_0_35px_0] items-center px-[24px] py-[451.5px]" data-name="Container">
      <Container69 />
    </div>
  );
}

function CenterPanel() {
  return (
    <div className="absolute bg-[#0b0f14] inset-[0_340px] overflow-clip" data-name="CENTER PANEL">
      <HorizontalBorder />
      <HorizontalBorder1 />
      <Container68 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[1136px] min-h-[1136px] relative shrink-0 w-full z-[1]" data-name="Container">
      <LeftPanel />
      <RightPanel />
      <CenterPanel />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative size-full" data-name="Frame" style={{ backgroundImage: "linear-gradient(90deg, rgb(11, 15, 20) 0%, rgb(11, 15, 20) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Header />
      <Container5 />
    </div>
  );
}