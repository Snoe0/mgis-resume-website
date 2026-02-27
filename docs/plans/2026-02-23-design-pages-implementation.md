# Additional Pages — Design.pen Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add four fully-detailed page frames to design.pen: Shop (Browse), Product Detail, Resume Editor, and AI Reviewer, all consistent with the existing dark theme.

**Architecture:** Each page is a top-level frame at 1440px wide placed to the right of the previous one on the canvas. Pages share the same header/footer visual style (copied structure, not reusable components since there are 0 reusable components defined). All content is static mock data.

**Tech Stack:** Pencil MCP tools (batch_design, batch_get, get_screenshot), design.pen file at `c:\School\MGIS\mgis-resume-website\design.pen`.

**Design tokens:**
- BG base: `#0A0A0B` | BG elevated: `#111113` | BG card: `#141417`
- Border: `#1F1F23` | Accent orange: `#FF5C00` | Accent purple: `#8B5CF6`
- Text primary: `#FFFFFF` | Text secondary: `#8B8B90` | Text muted: `#6B6B70`
- Fonts: Instrument Serif (headings), Inter (body/UI)
- Card radius: 12px | Frame width: 1440px

---

## Task 1: Shop Page — Outer Frame + Header

**File:** `c:\School\MGIS\mgis-resume-website\design.pen`

**Step 1: Find canvas position**

Use `find_empty_space_on_canvas` with direction=right, width=1440, height=3200, padding=100 to find where to place the shop page frame.

**Step 2: Create shop page outer frame + header**

```
shopPage=I(document, {type:"frame", name:"Shop - Browse Page", layout:"vertical", width:1440, fill:"#0A0A0B"})
shopHeader=I(shopPage, {type:"frame", name:"Header", layout:"horizontal", width:"fill_container", fill:"#0A0A0B", padding:[16,80], alignItems:"center", justifyContent:"space_between", stroke:{fill:"#1F1F23", thickness:1}})
shopLogo=I(shopHeader, {type:"text", content:"ResumeForge", fill:"#FFFFFF", fontFamily:"Instrument Serif", fontSize:20, fontWeight:"normal"})
shopNav=I(shopHeader, {type:"frame", layout:"horizontal", gap:32, alignItems:"center"})
shopNav1=I(shopNav, {type:"text", content:"Browse", fill:"#FF5C00", fontFamily:"Inter", fontSize:14})
shopNav2=I(shopNav, {type:"text", content:"Creators", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
shopNav3=I(shopNav, {type:"text", content:"Editor", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
shopNav4=I(shopNav, {type:"text", content:"Reviewer", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
shopAuthRow=I(shopHeader, {type:"frame", layout:"horizontal", gap:12, alignItems:"center"})
shopAuthBtn=I(shopAuthRow, {type:"frame", layout:"horizontal", padding:[8,16], cornerRadius:6, fill:"#FF5C00", alignItems:"center"})
shopAuthBtnTxt=I(shopAuthBtn, {type:"text", content:"Sell Templates", fill:"#FFFFFF", fontFamily:"Inter", fontSize:14, fontWeight:"600"})
```

**Step 3: Screenshot to verify header**

Call `get_screenshot` on the shopPage node. Verify header looks correct.

**Step 4: Commit checkpoint**
*(no git commit needed for .pen file changes — they autosave)*

---

## Task 2: Shop Page — Body (Sidebar + Card Grid)

**Step 1: Create body container**

```
shopBody=I(shopPage, {type:"frame", name:"shopBody", layout:"horizontal", width:"fill_container", fill:"#0A0A0B", gap:0})
```

**Step 2: Create filter sidebar**

```
shopSidebar=I(shopBody, {type:"frame", name:"Sidebar", layout:"vertical", width:280, fill:"#111113", padding:[32,24], gap:32, stroke:{fill:"#1F1F23", thickness:1}})
sidebarTitle=I(shopSidebar, {type:"text", content:"Filter Templates", fill:"#FFFFFF", fontFamily:"Inter", fontSize:16, fontWeight:"600"})
industrySection=I(shopSidebar, {type:"frame", name:"IndustryFilter", layout:"vertical", gap:12, width:"fill_container"})
industryLabel=I(industrySection, {type:"text", content:"INDUSTRY", fill:"#6B6B70", fontFamily:"Inter", fontSize:11, fontWeight:"600", letterSpacing:1})
ind1=I(industrySection, {type:"frame", layout:"horizontal", gap:10, alignItems:"center"})
ind1Box=I(ind1, {type:"rectangle", width:16, height:16, cornerRadius:3, stroke:{fill:"#1F1F23", thickness:1.5}, fill:"#FF5C00"})
ind1Lbl=I(ind1, {type:"text", content:"Technology", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
ind2=I(industrySection, {type:"frame", layout:"horizontal", gap:10, alignItems:"center"})
ind2Box=I(ind2, {type:"rectangle", width:16, height:16, cornerRadius:3, stroke:{fill:"#1F1F23", thickness:1.5}, fill:"#FF5C00"})
ind2Lbl=I(ind2, {type:"text", content:"Design", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
ind3=I(industrySection, {type:"frame", layout:"horizontal", gap:10, alignItems:"center"})
ind3Box=I(ind3, {type:"rectangle", width:16, height:16, cornerRadius:3, stroke:{fill:"#1F1F23", thickness:1.5}, fill:"#141417"})
ind3Lbl=I(ind3, {type:"text", content:"Business", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
ind4=I(industrySection, {type:"frame", layout:"horizontal", gap:10, alignItems:"center"})
ind4Box=I(ind4, {type:"rectangle", width:16, height:16, cornerRadius:3, stroke:{fill:"#1F1F23", thickness:1.5}, fill:"#141417"})
ind4Lbl=I(ind4, {type:"text", content:"Healthcare", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
```

**Step 3: Add more filter groups (Experience, Style, Price)**

```
expSection=I(shopSidebar, {type:"frame", name:"ExpFilter", layout:"vertical", gap:12, width:"fill_container"})
expLabel=I(expSection, {type:"text", content:"EXPERIENCE LEVEL", fill:"#6B6B70", fontFamily:"Inter", fontSize:11, fontWeight:"600", letterSpacing:1})
exp1=I(expSection, {type:"frame", layout:"horizontal", gap:10, alignItems:"center"})
exp1Box=I(exp1, {type:"rectangle", width:16, height:16, cornerRadius:3, stroke:{fill:"#1F1F23", thickness:1.5}, fill:"#141417"})
exp1Lbl=I(exp1, {type:"text", content:"Entry Level", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
exp2=I(expSection, {type:"frame", layout:"horizontal", gap:10, alignItems:"center"})
exp2Box=I(exp2, {type:"rectangle", width:16, height:16, cornerRadius:3, stroke:{fill:"#1F1F23", thickness:1.5}, fill:"#FF5C00"})
exp2Lbl=I(exp2, {type:"text", content:"Mid-Level", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
exp3=I(expSection, {type:"frame", layout:"horizontal", gap:10, alignItems:"center"})
exp3Box=I(exp3, {type:"rectangle", width:16, height:16, cornerRadius:3, stroke:{fill:"#1F1F23", thickness:1.5}, fill:"#141417"})
exp3Lbl=I(exp3, {type:"text", content:"Senior", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
```

**Step 4: Add active filter pills + main area**

Build the right-side main grid area with heading, sort, cards grid placeholder.

**Step 5: Screenshot the shop page and verify**

---

## Task 3: Shop Page — Template Cards Grid

**Step 1: Create main content area with heading bar**

```
shopMain=I(shopBody, {type:"frame", name:"shopMain", layout:"vertical", fill:"#0A0A0B", padding:[32,40], gap:32, width:"fill_container"})
shopTopBar=I(shopMain, {type:"frame", name:"topBar", layout:"horizontal", justifyContent:"space_between", alignItems:"center", width:"fill_container"})
shopHeading=I(shopTopBar, {type:"frame", layout:"vertical", gap:4})
shopH1=I(shopHeading, {type:"text", content:"Browse Templates", fill:"#FFFFFF", fontFamily:"Instrument Serif", fontSize:36, fontWeight:"normal"})
shopResultCount=I(shopHeading, {type:"text", content:"Showing 142 templates", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
shopSortWrap=I(shopTopBar, {type:"frame", layout:"horizontal", gap:8, alignItems:"center", padding:[8,12], cornerRadius:6, stroke:{fill:"#1F1F23", thickness:1}, fill:"#141417"})
shopSortLbl=I(shopSortWrap, {type:"text", content:"Sort: Most Popular", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
```

**Step 2: Create the card grid container**

```
cardGrid=I(shopMain, {type:"frame", name:"cardGrid", layout:"horizontal", gap:16, width:"fill_container"})
```

**Step 3: Create 3 template cards (columns)**

Each card: dark background, preview rect on top, metadata below.

```
card1=I(cardGrid, {type:"frame", name:"TemplateCard1", layout:"vertical", cornerRadius:12, fill:"#141417", stroke:{fill:"#1F1F23", thickness:1}, gap:0, width:"fill_container"})
card1Preview=I(card1, {type:"rectangle", width:"fill_container", height:200, cornerRadius:[12,12,0,0], fill:"#1A1A1D"})
G(card1Preview, "ai", "minimalist professional resume template clean white layout")
card1Meta=I(card1, {type:"frame", layout:"vertical", padding:[16,16], gap:12, width:"fill_container"})
card1Title=I(card1Meta, {type:"text", content:"Executive Pro", fill:"#FFFFFF", fontFamily:"Inter", fontSize:15, fontWeight:"600"})
card1Creator=I(card1Meta, {type:"text", content:"by Sarah Chen", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
card1Bottom=I(card1Meta, {type:"frame", layout:"horizontal", justifyContent:"space_between", alignItems:"center", width:"fill_container"})
card1Stars=I(card1Bottom, {type:"text", content:"★★★★★  4.9", fill:"#FF5C00", fontFamily:"Inter", fontSize:13})
card1Price=I(card1Bottom, {type:"text", content:"$24", fill:"#FFFFFF", fontFamily:"Inter", fontSize:15, fontWeight:"700"})
```

Repeat for card2 and card3 with different content.

**Step 4: Add a second row of 3 cards (6 total visible)**

**Step 5: Screenshot and verify card grid looks correct**

---

## Task 4: Shop Page — Active Filter Pills + Footer

**Step 1: Add active filter pills below heading**

```
activePills=I(shopMain, {type:"frame", name:"activePills", layout:"horizontal", gap:8, alignItems:"center"})
pillLabel=I(activePills, {type:"text", content:"Active:", fill:"#6B6B70", fontFamily:"Inter", fontSize:13})
pill1=I(activePills, {type:"frame", layout:"horizontal", gap:6, alignItems:"center", padding:[4,10], cornerRadius:100, fill:"#FF5C0020", stroke:{fill:"#FF5C0050", thickness:1}})
pill1Txt=I(pill1, {type:"text", content:"Technology", fill:"#FF5C00", fontFamily:"Inter", fontSize:12})
pill1X=I(pill1, {type:"text", content:"×", fill:"#FF5C00", fontFamily:"Inter", fontSize:14})
pill2=I(activePills, {type:"frame", layout:"horizontal", gap:6, alignItems:"center", padding:[4,10], cornerRadius:100, fill:"#FF5C0020", stroke:{fill:"#FF5C0050", thickness:1}})
pill2Txt=I(pill2, {type:"text", content:"Mid-Level", fill:"#FF5C00", fontFamily:"Inter", fontSize:12})
pill2X=I(pill2, {type:"text", content:"×", fill:"#FF5C00", fontFamily:"Inter", fontSize:14})
```

**Step 2: Reorder activePills above cardGrid using Move operation**

**Step 3: Add pagination bar at bottom of shopMain**

```
pagination=I(shopMain, {type:"frame", name:"pagination", layout:"horizontal", gap:4, alignItems:"center", justifyContent:"center", width:"fill_container"})
prevBtn=I(pagination, {type:"frame", padding:[8,12], cornerRadius:6, fill:"#141417", stroke:{fill:"#1F1F23", thickness:1}})
prevTxt=I(prevBtn, {type:"text", content:"←", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
pg1=I(pagination, {type:"frame", padding:[8,12], cornerRadius:6, fill:"#FF5C00"})
pg1Txt=I(pg1, {type:"text", content:"1", fill:"#FFFFFF", fontFamily:"Inter", fontSize:14, fontWeight:"600"})
pg2=I(pagination, {type:"frame", padding:[8,12], cornerRadius:6, fill:"#141417", stroke:{fill:"#1F1F23", thickness:1}})
pg2Txt=I(pg2, {type:"text", content:"2", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
pg3=I(pagination, {type:"frame", padding:[8,12], cornerRadius:6, fill:"#141417", stroke:{fill:"#1F1F23", thickness:1}})
pg3Txt=I(pg3, {type:"text", content:"3", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
nextBtn=I(pagination, {type:"frame", padding:[8,12], cornerRadius:6, fill:"#141417", stroke:{fill:"#1F1F23", thickness:1}})
nextTxt=I(nextBtn, {type:"text", content:"→", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
```

**Step 4: Add footer to shopPage (horizontal, same dark style)**

**Step 5: Screenshot full shop page and verify**

---

## Task 5: Product Detail Page — Frame + Header + Above-Fold

**File:** `c:\School\MGIS\mgis-resume-website\design.pen`

**Step 1: Create product page frame**

Place to right of shop page. Width=1440, layout=vertical, fill=#0A0A0B.

**Step 2: Add header (same style as shop)**

**Step 3: Create breadcrumb bar**

```
breadcrumb=I(productPage, {type:"frame", layout:"horizontal", gap:8, alignItems:"center", padding:[12,80], fill:"#0A0A0B", width:"fill_container"})
bc1=I(breadcrumb, {type:"text", content:"Browse", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
bcSep=I(breadcrumb, {type:"text", content:"/", fill:"#4A4A4E", fontFamily:"Inter", fontSize:13})
bc2=I(breadcrumb, {type:"text", content:"Technology", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
bcSep2=I(breadcrumb, {type:"text", content:"/", fill:"#4A4A4E", fontFamily:"Inter", fontSize:13})
bc3=I(breadcrumb, {type:"text", content:"Executive Pro", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13})
```

**Step 4: Create above-fold two-column layout**

```
productAbove=I(productPage, {type:"frame", name:"aboveFold", layout:"horizontal", gap:48, padding:[48,80], fill:"#0A0A0B", width:"fill_container", alignItems:"start"})
previewCol=I(productAbove, {type:"frame", name:"previewCol", layout:"vertical", gap:16, width:"fill_container"})
previewBg=I(previewCol, {type:"frame", cornerRadius:12, fill:"#111113", stroke:{fill:"#1F1F23", thickness:1}, width:"fill_container", height:520, alignItems:"center", justifyContent:"center"})
G(previewBg, "ai", "clean professional resume template on dark background preview")
previewToggles=I(previewCol, {type:"frame", layout:"horizontal", gap:8})
toggleLight=I(previewToggles, {type:"frame", padding:[6,14], cornerRadius:6, fill:"#FF5C00"})
toggleLightTxt=I(toggleLight, {type:"text", content:"Light", fill:"#FFFFFF", fontFamily:"Inter", fontSize:12, fontWeight:"600"})
toggleDark=I(previewToggles, {type:"frame", padding:[6,14], cornerRadius:6, fill:"#141417", stroke:{fill:"#1F1F23", thickness:1}})
toggleDarkTxt=I(toggleDark, {type:"text", content:"Dark", fill:"#8B8B90", fontFamily:"Inter", fontSize:12})
```

**Step 5: Screenshot and verify layout so far**

---

## Task 6: Product Detail Page — Purchase Sidebar + Tabs

**Step 1: Build purchase card (right column)**

```
purchaseCard=I(productAbove, {type:"frame", name:"purchaseCard", layout:"vertical", gap:20, padding:24, cornerRadius:12, fill:"#141417", stroke:{fill:"#1F1F23", thickness:1}, width:360})
prodTitle=I(purchaseCard, {type:"text", content:"Executive Pro Template", fill:"#FFFFFF", fontFamily:"Instrument Serif", fontSize:24, fontWeight:"normal"})
creatorRow=I(purchaseCard, {type:"frame", layout:"horizontal", gap:10, alignItems:"center"})
creatorAvatar=I(creatorRow, {type:"ellipse", width:32, height:32, fill:"#FF5C00"})
creatorInfo=I(creatorRow, {type:"frame", layout:"vertical", gap:2})
creatorName=I(creatorInfo, {type:"text", content:"Sarah Chen", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13, fontWeight:"600"})
creatorBadge=I(creatorInfo, {type:"text", content:"Top Seller", fill:"#FF5C00", fontFamily:"Inter", fontSize:11})
ratingRow=I(purchaseCard, {type:"frame", layout:"horizontal", gap:8, alignItems:"center"})
stars=I(ratingRow, {type:"text", content:"★★★★★", fill:"#FF5C00", fontFamily:"Inter", fontSize:14})
ratingNum=I(ratingRow, {type:"text", content:"4.9", fill:"#FFFFFF", fontFamily:"Inter", fontSize:14, fontWeight:"600"})
reviewCount=I(ratingRow, {type:"text", content:"(284 reviews)", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
priceRow=I(purchaseCard, {type:"frame", layout:"horizontal", gap:12, alignItems:"baseline"})
priceMain=I(priceRow, {type:"text", content:"$24", fill:"#FFFFFF", fontFamily:"Instrument Serif", fontSize:36, fontWeight:"normal"})
priceOld=I(priceRow, {type:"text", content:"$39", fill:"#4A4A4E", fontFamily:"Inter", fontSize:16})
```

**Step 2: Add CTA buttons and features checklist**

```
ctaBtn=I(purchaseCard, {type:"frame", layout:"horizontal", padding:[14,24], cornerRadius:8, fill:"#FF5C00", alignItems:"center", justifyContent:"center", width:"fill_container"})
ctaBtnTxt=I(ctaBtn, {type:"text", content:"Get Template — $24", fill:"#FFFFFF", fontFamily:"Inter", fontSize:15, fontWeight:"600"})
previewBtn=I(purchaseCard, {type:"frame", layout:"horizontal", padding:[12,24], cornerRadius:8, fill:"#141417", stroke:{fill:"#1F1F23", thickness:1}, alignItems:"center", justifyContent:"center", width:"fill_container"})
previewBtnTxt=I(previewBtn, {type:"text", content:"Preview Free", fill:"#FFFFFF", fontFamily:"Inter", fontSize:15})
featuresList=I(purchaseCard, {type:"frame", layout:"vertical", gap:10, width:"fill_container"})
featuresTitle=I(featuresList, {type:"text", content:"What's Included", fill:"#FFFFFF", fontFamily:"Inter", fontSize:14, fontWeight:"600"})
feat1=I(featuresList, {type:"frame", layout:"horizontal", gap:10, alignItems:"center"})
feat1Check=I(feat1, {type:"text", content:"✓", fill:"#FF5C00", fontFamily:"Inter", fontSize:13})
feat1Txt=I(feat1, {type:"text", content:"ATS-optimized template (.docx + .pdf)", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
feat2=I(featuresList, {type:"frame", layout:"horizontal", gap:10, alignItems:"center"})
feat2Check=I(feat2, {type:"text", content:"✓", fill:"#FF5C00", fontFamily:"Inter", fontSize:13})
feat2Txt=I(feat2, {type:"text", content:"Editable in ResumeForge editor", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
feat3=I(featuresList, {type:"frame", layout:"horizontal", gap:10, alignItems:"center"})
feat3Check=I(feat3, {type:"text", content:"✓", fill:"#FF5C00", fontFamily:"Inter", fontSize:13})
feat3Txt=I(feat3, {type:"text", content:"Lifetime access + future updates", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
```

**Step 3: Add tabs section below above-fold**

Create a tab bar with "Features", "Reviews", "Related" tabs and placeholder content area.

**Step 4: Screenshot full product page and verify**

---

## Task 7: Resume Editor Page — Toolbar + Three-Panel Shell

**File:** `c:\School\MGIS\mgis-resume-website\design.pen`

**Step 1: Create editor page frame**

Width=1440, layout=vertical, fill=#0A0A0B, height=900 (viewport-height feel).

**Step 2: Build compact top toolbar**

```
editorPage=I(document, {type:"frame", name:"Resume Editor Page", layout:"vertical", width:1440, fill:"#0A0A0B"})
editorToolbar=I(editorPage, {type:"frame", name:"toolbar", layout:"horizontal", width:"fill_container", fill:"#111113", padding:[0,16], alignItems:"center", justifyContent:"space_between", height:52, stroke:{fill:"#1F1F23", thickness:1}})
toolbarLeft=I(editorToolbar, {type:"frame", layout:"horizontal", gap:16, alignItems:"center"})
toolbarLogo=I(toolbarLeft, {type:"text", content:"RF", fill:"#FF5C00", fontFamily:"Instrument Serif", fontSize:20})
toolbarDivider1=I(toolbarLeft, {type:"rectangle", width:1, height:24, fill:"#1F1F23"})
toolbarTitle=I(toolbarLeft, {type:"text", content:"Untitled Resume", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
toolbarCenter=I(editorToolbar, {type:"frame", layout:"horizontal", gap:4, alignItems:"center"})
tbUndo=I(toolbarCenter, {type:"frame", padding:[6,10], cornerRadius:4, fill:"#141417"})
tbUndoTxt=I(tbUndo, {type:"text", content:"↩", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
tbRedo=I(toolbarCenter, {type:"frame", padding:[6,10], cornerRadius:4, fill:"#141417"})
tbRedoTxt=I(tbRedo, {type:"text", content:"↪", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
tbDiv2=I(toolbarCenter, {type:"rectangle", width:1, height:24, fill:"#1F1F23"})
tbBold=I(toolbarCenter, {type:"frame", padding:[6,10], cornerRadius:4, fill:"#141417"})
tbBoldTxt=I(tbBold, {type:"text", content:"B", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13, fontWeight:"700"})
tbItalic=I(toolbarCenter, {type:"frame", padding:[6,10], cornerRadius:4, fill:"#141417"})
tbItalicTxt=I(tbItalic, {type:"text", content:"I", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
tbUnderline=I(toolbarCenter, {type:"frame", padding:[6,10], cornerRadius:4, fill:"#141417"})
tbUnderlineTxt=I(tbUnderline, {type:"text", content:"U̲", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
toolbarRight=I(editorToolbar, {type:"frame", layout:"horizontal", gap:8, alignItems:"center"})
previewTbBtn=I(toolbarRight, {type:"frame", padding:[7,14], cornerRadius:6, fill:"#141417", stroke:{fill:"#1F1F23", thickness:1}})
previewTbTxt=I(previewTbBtn, {type:"text", content:"Preview", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13})
exportTbBtn=I(toolbarRight, {type:"frame", padding:[7,14], cornerRadius:6, fill:"#FF5C00"})
exportTbTxt=I(exportTbBtn, {type:"text", content:"Export PDF", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13, fontWeight:"600"})
```

**Step 3: Screenshot toolbar and verify**

---

## Task 8: Resume Editor Page — Three Panels

**Step 1: Create the three-panel container**

```
editorBody=I(editorPage, {type:"frame", name:"editorBody", layout:"horizontal", width:"fill_container", height:848, fill:"#0A0A0B"})
```

**Step 2: Left panel — Section Manager**

```
sectionsPanel=I(editorBody, {type:"frame", name:"sectionsPanel", layout:"vertical", width:240, fill:"#111113", padding:[24,16], gap:16, stroke:{fill:"#1F1F23", thickness:1}})
sectionsPanelTitle=I(sectionsPanel, {type:"text", content:"Sections", fill:"#FFFFFF", fontFamily:"Inter", fontSize:14, fontWeight:"600"})
secRow1=I(sectionsPanel, {type:"frame", layout:"horizontal", gap:10, alignItems:"center", width:"fill_container", padding:[8,12], cornerRadius:6, fill:"#141417"})
secDrag1=I(secRow1, {type:"text", content:"⠿", fill:"#4A4A4E", fontFamily:"Inter", fontSize:14})
secEye1=I(secRow1, {type:"text", content:"●", fill:"#FF5C00", fontFamily:"Inter", fontSize:10})
secName1=I(secRow1, {type:"text", content:"Personal Info", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13, width:"fill_container"})
secRow2=I(sectionsPanel, {type:"frame", layout:"horizontal", gap:10, alignItems:"center", width:"fill_container", padding:[8,12], cornerRadius:6, fill:"#141417"})
secDrag2=I(secRow2, {type:"text", content:"⠿", fill:"#4A4A4E", fontFamily:"Inter", fontSize:14})
secEye2=I(secRow2, {type:"text", content:"●", fill:"#FF5C00", fontFamily:"Inter", fontSize:10})
secName2=I(secRow2, {type:"text", content:"Work Experience", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13, width:"fill_container"})
secRow3=I(sectionsPanel, {type:"frame", layout:"horizontal", gap:10, alignItems:"center", width:"fill_container", padding:[8,12], cornerRadius:6, fill:"#141417"})
secDrag3=I(secRow3, {type:"text", content:"⠿", fill:"#4A4A4E", fontFamily:"Inter", fontSize:14})
secEye3=I(secRow3, {type:"text", content:"○", fill:"#4A4A4E", fontFamily:"Inter", fontSize:10})
secName3=I(secRow3, {type:"text", content:"Education", fill:"#8B8B90", fontFamily:"Inter", fontSize:13, width:"fill_container"})
secRow4=I(sectionsPanel, {type:"frame", layout:"horizontal", gap:10, alignItems:"center", width:"fill_container", padding:[8,12], cornerRadius:6, fill:"#141417"})
secDrag4=I(secRow4, {type:"text", content:"⠿", fill:"#4A4A4E", fontFamily:"Inter", fontSize:14})
secEye4=I(secRow4, {type:"text", content:"●", fill:"#FF5C00", fontFamily:"Inter", fontSize:10})
secName4=I(secRow4, {type:"text", content:"Skills", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13, width:"fill_container"})
addSecBtn=I(sectionsPanel, {type:"frame", layout:"horizontal", gap:8, alignItems:"center", padding:[8,12], cornerRadius:6, stroke:{fill:"#1F1F23", thickness:1}, fill:"#0A0A0B", justifyContent:"center", width:"fill_container"})
addSecPlus=I(addSecBtn, {type:"text", content:"+", fill:"#8B8B90", fontFamily:"Inter", fontSize:16})
addSecTxt=I(addSecBtn, {type:"text", content:"Add Section", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
```

**Step 3: Center panel — Resume Canvas**

```
canvasPanel=I(editorBody, {type:"frame", name:"canvasPanel", layout:"vertical", fill:"#1A1A1D", width:"fill_container", padding:[24,24], gap:16, alignItems:"center"})
resumeCanvas=I(canvasPanel, {type:"frame", name:"resumeCanvas", layout:"vertical", fill:"#FFFFFF", width:595, cornerRadius:4, padding:[48,48], gap:20})
resumeHeader=I(resumeCanvas, {type:"frame", layout:"vertical", gap:4, width:"fill_container"})
resumeName=I(resumeHeader, {type:"text", content:"Alexandra Johnson", fill:"#111111", fontFamily:"Inter", fontSize:22, fontWeight:"700"})
resumeTitle=I(resumeHeader, {type:"text", content:"Senior Product Designer", fill:"#555555", fontFamily:"Inter", fontSize:14})
resumeContact=I(resumeHeader, {type:"text", content:"alexandra@email.com  •  (555) 234-5678  •  San Francisco, CA", fill:"#777777", fontFamily:"Inter", fontSize:12})
resumeDivider=I(resumeCanvas, {type:"rectangle", width:"fill_container", height:2, fill:"#FF5C00"})
resumeExpHead=I(resumeCanvas, {type:"text", content:"WORK EXPERIENCE", fill:"#333333", fontFamily:"Inter", fontSize:10, fontWeight:"700", letterSpacing:1.5})
resumeJob=I(resumeCanvas, {type:"frame", layout:"vertical", gap:4, width:"fill_container"})
resumeJobTitle=I(resumeJob, {type:"text", content:"Lead Product Designer — Figma", fill:"#111111", fontFamily:"Inter", fontSize:13, fontWeight:"600"})
resumeJobDate=I(resumeJob, {type:"text", content:"2022 – Present", fill:"#777777", fontFamily:"Inter", fontSize:12})
resumeJobDesc=I(resumeJob, {type:"text", content:"Led a team of 5 designers to redesign the core editor experience, increasing user retention by 34% and NPS by 18 points.", fill:"#555555", fontFamily:"Inter", fontSize:12, lineHeight:1.5, textGrowth:"fixed-width", width:499})
```

**Step 4: Right panel — Customize**

```
customizePanel=I(editorBody, {type:"frame", name:"customizePanel", layout:"vertical", width:280, fill:"#111113", padding:[24,16], gap:24, stroke:{fill:"#1F1F23", thickness:1}})
custTitle=I(customizePanel, {type:"text", content:"Customize", fill:"#FFFFFF", fontFamily:"Inter", fontSize:14, fontWeight:"600"})
colorSection=I(customizePanel, {type:"frame", layout:"vertical", gap:10, width:"fill_container"})
colorLabel=I(colorSection, {type:"text", content:"ACCENT COLOR", fill:"#6B6B70", fontFamily:"Inter", fontSize:11, fontWeight:"600", letterSpacing:1})
colorSwatches=I(colorSection, {type:"frame", layout:"horizontal", gap:8})
swatch1=I(colorSwatches, {type:"ellipse", width:24, height:24, fill:"#FF5C00", stroke:{fill:"#FFFFFF", thickness:2}})
swatch2=I(colorSwatches, {type:"ellipse", width:24, height:24, fill:"#8B5CF6"})
swatch3=I(colorSwatches, {type:"ellipse", width:24, height:24, fill:"#2563EB"})
swatch4=I(colorSwatches, {type:"ellipse", width:24, height:24, fill:"#10B981"})
swatch5=I(colorSwatches, {type:"ellipse", width:24, height:24, fill:"#1F1F23", stroke:{fill:"#FF5C00", thickness:1.5}})
fontSection=I(customizePanel, {type:"frame", layout:"vertical", gap:10, width:"fill_container"})
fontLabel=I(fontSection, {type:"text", content:"FONT FAMILY", fill:"#6B6B70", fontFamily:"Inter", fontSize:11, fontWeight:"600", letterSpacing:1})
fontPicker=I(fontSection, {type:"frame", layout:"horizontal", justifyContent:"space_between", alignItems:"center", padding:[8,12], cornerRadius:6, fill:"#141417", stroke:{fill:"#1F1F23", thickness:1}, width:"fill_container"})
fontPickerTxt=I(fontPicker, {type:"text", content:"Inter", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13})
fontPickerArrow=I(fontPicker, {type:"text", content:"▾", fill:"#8B8B90", fontFamily:"Inter", fontSize:12})
```

**Step 5: Screenshot editor page and verify three-panel layout**

---

## Task 9: AI Reviewer Page — Frame + Score Bar

**File:** `c:\School\MGIS\mgis-resume-website\design.pen`

**Step 1: Create reviewer page frame + header**

```
reviewerPage=I(document, {type:"frame", name:"AI Reviewer Page", layout:"vertical", width:1440, fill:"#0A0A0B"})
```
Add the same header as other pages.

**Step 2: Create score bar across top**

```
scoreBar=I(reviewerPage, {type:"frame", name:"scoreBar", layout:"horizontal", width:"fill_container", fill:"#111113", padding:[24,80], gap:48, alignItems:"center", stroke:{fill:"#1F1F23", thickness:1}})
scoreLeft=I(scoreBar, {type:"frame", layout:"vertical", gap:4})
scoreBarTitle=I(scoreLeft, {type:"text", content:"AI Resume Analysis", fill:"#FFFFFF", fontFamily:"Inter", fontSize:18, fontWeight:"600"})
scoreBarSub=I(scoreLeft, {type:"text", content:"Analyzed May 2024 · executive-resume.pdf", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
scoreMain=I(scoreBar, {type:"frame", layout:"vertical", gap:4, alignItems:"center"})
scoreCircleBg=I(scoreMain, {type:"ellipse", width:80, height:80, fill:"#141417", stroke:{fill:"#FF5C00", thickness:4}})
scoreNum=I(scoreMain, {type:"text", content:"8.2", fill:"#FFFFFF", fontFamily:"Instrument Serif", fontSize:28})
scoreLbl=I(scoreMain, {type:"text", content:"Overall Score", fill:"#8B8B90", fontFamily:"Inter", fontSize:12})
```

**Step 3: Add category score bars**

```
catScores=I(scoreBar, {type:"frame", layout:"horizontal", gap:24, alignItems:"center", width:"fill_container"})
cat1=I(catScores, {type:"frame", layout:"vertical", gap:6, width:"fill_container"})
cat1Label=I(cat1, {type:"text", content:"ATS Score", fill:"#8B8B90", fontFamily:"Inter", fontSize:12})
cat1Bar=I(cat1, {type:"frame", layout:"horizontal", width:"fill_container", height:6, cornerRadius:3, fill:"#1F1F23"})
cat1Fill=I(cat1Bar, {type:"rectangle", width:"fill_container", height:6, cornerRadius:3, fill:"#10B981"})
cat1Num=I(cat1, {type:"text", content:"92%", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13, fontWeight:"600"})
cat2=I(catScores, {type:"frame", layout:"vertical", gap:6, width:"fill_container"})
cat2Label=I(cat2, {type:"text", content:"Clarity", fill:"#8B8B90", fontFamily:"Inter", fontSize:12})
cat2Bar=I(cat2, {type:"frame", layout:"horizontal", width:"fill_container", height:6, cornerRadius:3, fill:"#1F1F23"})
cat2Fill=I(cat2Bar, {type:"rectangle", width:"fill_container", height:6, cornerRadius:3, fill:"#FF5C00"})
cat2Num=I(cat2, {type:"text", content:"78%", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13, fontWeight:"600"})
cat3=I(catScores, {type:"frame", layout:"vertical", gap:6, width:"fill_container"})
cat3Label=I(cat3, {type:"text", content:"Impact", fill:"#8B8B90", fontFamily:"Inter", fontSize:12})
cat3Bar=I(cat3, {type:"frame", layout:"horizontal", width:"fill_container", height:6, cornerRadius:3, fill:"#1F1F23"})
cat3Fill=I(cat3Bar, {type:"rectangle", width:"fill_container", height:6, cornerRadius:3, fill:"#8B5CF6"})
cat3Num=I(cat3, {type:"text", content:"85%", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13, fontWeight:"600"})
```

**Step 4: Screenshot score bar and verify**

---

## Task 10: AI Reviewer Page — Two-Column Review State + Export Bar

**Step 1: Create two-column body**

```
reviewerBody=I(reviewerPage, {type:"frame", name:"reviewerBody", layout:"horizontal", width:"fill_container", fill:"#0A0A0B", padding:[32,80], gap:32, alignItems:"start"})
```

**Step 2: Left — Resume preview with highlights**

```
resumePreviewCol=I(reviewerBody, {type:"frame", name:"resumePreviewCol", layout:"vertical", gap:12, width:"fill_container"})
previewLabel=I(resumePreviewCol, {type:"text", content:"Resume Preview", fill:"#8B8B90", fontFamily:"Inter", fontSize:12, fontWeight:"600"})
resumePreviewCard=I(resumePreviewCol, {type:"frame", cornerRadius:12, fill:"#FFFFFF", width:"fill_container", height:680, padding:[32,32], layout:"vertical", gap:16, stroke:{fill:"#1F1F23", thickness:1}})
rpName=I(resumePreviewCard, {type:"text", content:"Alexandra Johnson", fill:"#111111", fontFamily:"Inter", fontSize:20, fontWeight:"700"})
rpContactBar=I(resumePreviewCard, {type:"text", content:"alexandra@email.com  •  (555) 234-5678  •  San Francisco, CA", fill:"#777777", fontFamily:"Inter", fontSize:11})
rpDivider=I(resumePreviewCard, {type:"rectangle", width:"fill_container", height:2, fill:"#FF5C00"})
warningHighlight=I(resumePreviewCard, {type:"frame", padding:[8,12], cornerRadius:4, fill:"#FFF7002A", stroke:{fill:"#FFF70060", thickness:1}, width:"fill_container", layout:"vertical", gap:4})
warnIcon=I(warningHighlight, {type:"text", content:"⚠ Work Experience — Needs Improvement", fill:"#FFC107", fontFamily:"Inter", fontSize:11, fontWeight:"600"})
warnText=I(warningHighlight, {type:"text", content:"Managed team projects and delivered results on schedule...", fill:"#555555", fontFamily:"Inter", fontSize:12, textGrowth:"fixed-width", width:"fill_container"})
goodHighlight=I(resumePreviewCard, {type:"frame", padding:[8,12], cornerRadius:4, fill:"#10B98115", stroke:{fill:"#10B98140", thickness:1}, width:"fill_container", layout:"vertical", gap:4})
goodIcon=I(goodHighlight, {type:"text", content:"✓ Skills Section — Strong", fill:"#10B981", fontFamily:"Inter", fontSize:11, fontWeight:"600"})
goodText=I(goodHighlight, {type:"text", content:"Python, TypeScript, React, Figma, SQL, AWS, Agile", fill:"#555555", fontFamily:"Inter", fontSize:12})
```

**Step 3: Right — Suggestions panel**

```
suggestionsPanel=I(reviewerBody, {type:"frame", name:"suggestionsPanel", layout:"vertical", width:420, gap:16})
suggestHeader=I(suggestionsPanel, {type:"frame", layout:"horizontal", justifyContent:"space_between", alignItems:"center", width:"fill_container"})
suggestTitle=I(suggestHeader, {type:"text", content:"AI Suggestions", fill:"#FFFFFF", fontFamily:"Inter", fontSize:16, fontWeight:"600"})
suggestCounts=I(suggestHeader, {type:"frame", layout:"horizontal", gap:8})
pendingBadge=I(suggestCounts, {type:"frame", padding:[3,10], cornerRadius:100, fill:"#FF5C0020"})
pendingTxt=I(pendingBadge, {type:"text", content:"3 Pending", fill:"#FF5C00", fontFamily:"Inter", fontSize:12})
appliedBadge=I(suggestCounts, {type:"frame", padding:[3,10], cornerRadius:100, fill:"#10B98120"})
appliedTxt=I(appliedBadge, {type:"text", content:"2 Applied", fill:"#10B981", fontFamily:"Inter", fontSize:12})
```

**Step 4: Add suggestion cards (3-4 cards)**

Each card: warning/improvement/success type, section label, before/after text, Accept + Dismiss buttons.

```
sug1=I(suggestionsPanel, {type:"frame", layout:"vertical", gap:12, padding:16, cornerRadius:10, fill:"#141417", stroke:{fill:"#FFC10730", thickness:1}, width:"fill_container"})
sug1Top=I(sug1, {type:"frame", layout:"horizontal", justifyContent:"space_between", alignItems:"center", width:"fill_container"})
sug1Badge=I(sug1Top, {type:"frame", padding:[3,10], cornerRadius:100, fill:"#FFC10720"})
sug1BadgeTxt=I(sug1Badge, {type:"text", content:"⚠ Improvement", fill:"#FFC107", fontFamily:"Inter", fontSize:11})
sug1Section=I(sug1Top, {type:"text", content:"Work Experience", fill:"#8B8B90", fontFamily:"Inter", fontSize:12})
sug1Before=I(sug1, {type:"text", content:"\"Managed team projects...\"", fill:"#6B6B70", fontFamily:"Inter", fontSize:12, lineHeight:1.4, textGrowth:"fixed-width", width:"fill_container"})
sug1After=I(sug1, {type:"text", content:"\"Led cross-functional team of 8 engineers, delivering 3 major product launches 2 weeks ahead of schedule.\"", fill:"#FFFFFF", fontFamily:"Inter", fontSize:12, lineHeight:1.4, textGrowth:"fixed-width", width:"fill_container"})
sug1Btns=I(sug1, {type:"frame", layout:"horizontal", gap:8, width:"fill_container"})
sug1Accept=I(sug1Btns, {type:"frame", padding:[7,14], cornerRadius:6, fill:"#10B981", width:"fill_container", alignItems:"center", justifyContent:"center"})
sug1AcceptTxt=I(sug1Accept, {type:"text", content:"Apply", fill:"#FFFFFF", fontFamily:"Inter", fontSize:13, fontWeight:"600"})
sug1Dismiss=I(sug1Btns, {type:"frame", padding:[7,14], cornerRadius:6, fill:"#141417", stroke:{fill:"#1F1F23", thickness:1}, width:"fill_container", alignItems:"center", justifyContent:"center"})
sug1DismissTxt=I(sug1Dismiss, {type:"text", content:"Dismiss", fill:"#8B8B90", fontFamily:"Inter", fontSize:13})
```

Repeat for 2 more suggestion cards with different types (success, warning).

**Step 5: Add export bar at bottom of reviewerPage**

```
exportBar=I(reviewerPage, {type:"frame", name:"exportBar", layout:"horizontal", width:"fill_container", fill:"#111113", padding:[16,80], alignItems:"center", justifyContent:"space_between", stroke:{fill:"#1F1F23", thickness:1}})
exportInfo=I(exportBar, {type:"text", content:"2 of 5 suggestions applied", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
exportActions=I(exportBar, {type:"frame", layout:"horizontal", gap:12, alignItems:"center"})
startOver=I(exportActions, {type:"text", content:"Start Over", fill:"#8B8B90", fontFamily:"Inter", fontSize:14})
exportBtn=I(exportActions, {type:"frame", padding:[10,20], cornerRadius:8, fill:"#FF5C00"})
exportBtnTxt=I(exportBtn, {type:"text", content:"Export Improved Resume", fill:"#FFFFFF", fontFamily:"Inter", fontSize:14, fontWeight:"600"})
```

**Step 6: Screenshot full reviewer page and verify**

---

## Task 11: Upload State Overlay for Reviewer

**Step 1: Create upload state as an overlay frame inside reviewerPage**

Position as a floating card visually, or as a separate note/variation below the main reviewer page.

```
uploadState=I(reviewerPage, {type:"frame", name:"Upload State (variant)", layout:"vertical", width:1440, fill:"#0A0A0B", gap:0, alignItems:"center", justifyContent:"center", padding:[80,0]})
uploadCard=I(uploadState, {type:"frame", layout:"vertical", gap:24, padding:48, cornerRadius:16, fill:"#141417", stroke:{fill:"#1F1F23", thickness:1}, alignItems:"center", width:560})
uploadIcon=I(uploadCard, {type:"frame", width:64, height:64, cornerRadius:32, fill:"#FF5C0020", alignItems:"center", justifyContent:"center"})
uploadIconStar=I(uploadIcon, {type:"text", content:"✦", fill:"#FF5C00", fontFamily:"Inter", fontSize:28})
uploadTitle=I(uploadCard, {type:"text", content:"Analyze My Resume", fill:"#FFFFFF", fontFamily:"Instrument Serif", fontSize:32, fontWeight:"normal", textAlign:"center"})
uploadSub=I(uploadCard, {type:"text", content:"Get instant AI-powered feedback on your resume. See your ATS score, clarity rating, and actionable improvements.", fill:"#8B8B90", fontFamily:"Inter", fontSize:15, lineHeight:1.5, textAlign:"center", textGrowth:"fixed-width", width:440})
dropZone=I(uploadCard, {type:"frame", layout:"vertical", gap:12, padding:[32,24], cornerRadius:12, stroke:{fill:"#1F1F23", thickness:2}, fill:"#0A0A0B", alignItems:"center", justifyContent:"center", width:"fill_container"})
dropIcon=I(dropZone, {type:"text", content:"↑", fill:"#8B8B90", fontFamily:"Inter", fontSize:32})
dropPrimary=I(dropZone, {type:"text", content:"Drop your resume here or click to browse", fill:"#FFFFFF", fontFamily:"Inter", fontSize:14, fontWeight:"600"})
dropSecondary=I(dropZone, {type:"text", content:"Supports PDF, DOCX, TXT · Max 10MB", fill:"#6B6B70", fontFamily:"Inter", fontSize:13})
analyzeBtn=I(uploadCard, {type:"frame", padding:[12,32], cornerRadius:8, fill:"#FF5C00", alignItems:"center", justifyContent:"center", width:"fill_container"})
analyzeBtnTxt=I(analyzeBtn, {type:"text", content:"Analyze My Resume", fill:"#FFFFFF", fontFamily:"Inter", fontSize:15, fontWeight:"600"})
```

**Step 2: Screenshot upload state and verify**

---

## Task 12: Final Verification + Vault Update

**Step 1: Screenshot all four pages in sequence**

Take a screenshot of each of the four page frames to verify:
- Visual consistency across pages (same dark theme, fonts, accent colors)
- No obvious layout bugs (clipped text, overlapping elements, broken alignment)
- Content is readable and hierarchy is clear

**Step 2: Update Claude Vault progress notes**

Write to `C:\Users\thesh\OneDrive\Desktop\Claude Vault\Projects\mgis-resume-website\Progress.md`

**Step 3: Verify canvas layout**

Run `snapshot_layout` on the document to verify all 5 frames (landing + 4 new pages) are placed correctly on canvas without overlapping.
