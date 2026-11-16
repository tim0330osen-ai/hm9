# R 語言統計計算與程式設計練習題庫總覽

> 📅 **建立日期**：2026-11-16 ｜ 🔄 **最後更新**：2026-11-16  
> 🏷️ **標籤**：`#R語言` `#統計學` `#資料分析` `#程式設計`  
> 📝 **核心摘要**：彙整國立政治大學統計學系吳漢銘老師編著之《R 練習題 (v2021.09)》，包含九大核心單元、170 頁之完整統計計算、程式實作、圖形視覺化與資料分析實戰練習，並內嵌完整 PDF 線上閱讀器。

---

## 1. 核心概念與概述

本份資料整理自國立政治大學統計學系吳漢銘老師（Prof. Han-Ming Wu）所彙編之 R 語言練習題教材（版本：v2021.09，發布日期：2021 年 10 月 22 日）。

- **教材作者**：吳漢銘（國立政治大學統計學系）
- **聯絡資訊**：`hmwu@g.nccu.edu.tw`
- **作者個人網站**：[http://www.hmwu.idv.tw](http://www.hmwu.idv.tw)
- **原始教材載點**：[線上原始 PDF 連結](https://hmwu.idv.tw/web/R/R-exercise-v2021_9.pdf) ｜ [網站內建備份 (assets/R-exercise-v2021_9.pdf)](assets/R-exercise-v2021_9.pdf)
- **總頁數與題量**：全書共 170 頁，涵蓋基礎語法、程式設計、統計繪圖、微積分線代運算、機率模型模擬、資料整算與高階資料分析等完整範疇。

---

## 2. 教材 PDF 內嵌線上閱讀器

您可以直接在下方閱讀器中滾動翻頁、縮放閱讀完整的 170 頁題目：

<div style="margin: 20px 0; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
  <iframe src="assets/R-exercise-v2021_9.pdf" width="100%" height="800px" style="border: none; display: block;">
    您的瀏覽器不支援直接內嵌 PDF，請點擊下方連結下載閱讀。
  </iframe>
</div>

> 📥 **獨立檢視與下載**：[在新分頁開啟或下載 PDF](assets/R-exercise-v2021_9.pdf)

---

## 3. 九大核心單元與知識重點

全書共劃分為九大核心單元，各單元對應之練習範疇與核心技能條列如下：

### 1. 基礎：物件、輸入輸出 (頁碼 2 ~ 14)
- **R 專案與工作目錄管理**：建立專案、查詢工作目錄（`getwd`, `setwd`）、列出子目錄檔案（`list.dirs`, `list.files`）。
- **套件安裝與管理**：CRAN 鏡射站安裝（`install.packages`）、Bioconductor 生物資訊套件安裝、查詢已安裝套件。
- **基本物件與數列生成**：重複指令 `rep`、數列生成 `seq`、字串結合 `paste`、反轉 `rev`。
- **資料結構操作**：向量（Vector）、因子（Factor，含順序因子）、矩陣（Matrix）、資料框（Data Frame）、列表（List）。
- **外部檔案讀取**：文字檔（`.txt`）、CSV（`.csv`）、Excel 檔（`readxl::read_excel`）。

### 2. 程式設計 (頁碼 15 ~ 47)
- **流程控制**：條件判斷（`if...else`, `ifelse`, `switch`）、迴圈（`for`, `while`, `repeat`, `break`）。
- **自訂函式編寫**：九九乘法表、Pascal 三角形、階乘（`factorial`）、執行時間量測（`system.time`）。
- **演算法與經典益智遊戲實作**：
  - 骰子遊戲、十八啦比大小模擬。
  - 剪刀石頭布遊戲（`sample`, 互動迴圈）。
  - 數字賓果遊戲（$5 \times 5$ 矩陣連線判定）。
  - 幾 A 幾 B 猜數字遊戲（隨機抽樣、比對演算法）。
  - 搶旗遊戲（互動出拳移動、搭配 `rpanel` GUI 控制台介面設計）。
- **數值計算與幾何問題**：海龍公式（Heron's Formula）、三角形型態判別（直角/等腰/鈍角/銳角）、鈔票找零最少張數問題。

### 3. 繪圖：Base graphics (頁碼 48 ~ 84)
- **基礎圖形繪製**：`plot`, `curve`, `abline`, `text`, `polygon`, `arrows`, `segments`。
- **數學與統計函數圖形**：對數函數、三角函數（$\sin, \cos, \tan$）、極座標圖形（玫瑰線、心臟線、雙紐線）。
- **統計分佈視覺化**：常態分佈、t 分佈、Rayleigh 分佈、Poisson 分佈、Gamma 分佈之機率密度圖。
- **探索性統計圖**：直方圖（Histogram）、箱形圖（Boxplot）、散佈圖矩陣、泡泡圖（Bubble Plot）、熱圖（Heatmap，配合 `colID` 與 `rowID` 色條）。
- **進階繪圖**：二元常態分佈 3D 透視圖（`persp`, `plot3D`）、台灣地理地圖標記、面量圖（Choropleth Map）。

### 4. 繪圖：ggplot2 (頁碼 85 ~ 98)
- **語法核心與圖層概念**：`geom_point`, `geom_line`, `geom_bar`, `geom_segment`, `geom_label`。
- **Tidy Data 轉換**：使用 `stack`, `reshape2::melt` 整理繪圖資料。
- **政府開放資料實戰**：臺北市所得收入資料視覺化、全國薪資與工時比較。
- **疫情與公衛資料視覺化**：台灣 COVID-19 本土案例與校正回歸長條圖/折線圖、登革熱病媒蚊病例分析。
- **地理空間圖形**：2020 美國總統大選各縣市得票面量圖、台中市行政區人口密度面量圖。

### 5. 微積分、線性代數 (頁碼 99 ~ 110)
- **線性代數運算**：矩陣相乘、轉置矩陣、逆矩陣（`solve`）、特徵值與特徵向量（`eigen`）、LU 分解、矩陣秩（Rank）。
- **空間幾何**：單位向量、兩向量之 Cosine 夾角、平行平面法線向量與距離公式。
- **微積分數值方法**：
  - 差商逼近導數（The Forward-Difference Formula）。
  - 黎曼和（Riemann sum：下和、上和、中點和）。
  - 數值積分：合成梯形法（Composite Trapezoidal Rule）、`integrate` 指令。
  - 非線性方程式求根：牛頓法（Newton's Method）、固定點迭代法（Fixed-Point Method）。

### 6. 機率與統計 (頁碼 111 ~ 136)
- **離散與連續機率模型**：Bernoulli, Binomial, Poisson, 幾何分佈、常態分佈、Gamma 分佈。
- **隨機模擬實驗**：蒙地卡羅抽球實驗（放回與不放回）、大樂透抽獎模擬、撲克牌牌型機率計算（順子、同花、葫蘆等）。
- **敘述統計與關聯度量**：標準分數（z-score）、樣本偏態（Skewness）、峰度（Kurtosis）、截尾平均數（Trimmed Mean）、Cramér's V 關聯係數、Pearson / Spearman 等級相關係數。
- **統計推論與假設檢定**：獨立雙樣本 t 檢定、兩常態母體變異數 F 檢定、卡方獨立性檢定（列聯表）。
- **核密度估計（KDE）**：Triangular, Gaussian, Epanechnikov 核函數實作。

### 7. 資料處理 (頁碼 137 ~ 146)
- **表格合併與維度操作**：`rbind`, `cbind`。
- **列聯表與摘要統計**：`table`, `xtabs`（Titanic 資料集維度過濾與分析）。
- **寬長資料表轉換**：`stack`, `unstack`。
- **分組聚合計算**：`aggregate`, `tapply`。
- **數值分箱與區間化**：`cut`（全距等分、四分位數分組）。
- **向量化與迴圈函數**：`lapply`, `sapply`, `mapply`, `replicate`。

### 8. 資料分析 (頁碼 147 ~ 167)
- **探索性資料分析（EDA）**：癌症登記統計分析、實價登錄資料分析、家庭收支調查分析、空氣品質監測資料（AQI 指標計算與缺失值補值評估）。
- **多變量分析與維度縮減**：
  - 主成份分析（PCA）。
  - 多元尺度法（MDS）、ISOMAP、切片逆迴歸法（SIR）。
  - 典型相關分析（Canonical Correlation Analysis, CCA）。
- **統計建模與機器學習**：
  - 簡單與多元線性迴歸模型、逐步迴歸變數篩選。
  - 分類模型：k 最近鄰居（KNN）、支援向量機（SVM）、隨機森林（Random Forest）、決策樹（rpart）、XGBoost。
  - 模型評估：混淆矩陣、ROC 曲線與 AUC、10-Fold 交叉驗證（Cross-Validation）。
  - 群集分析（Clustering）：階層式分群（Hierarchical Clustering）、K-means 分群、分群有效性評估（clValid）。
  - 關聯性分析（Association Rules）：Apriori 演算法、Support / Confidence / Lift 計算、頻繁項目集視覺化。

### 9. 其它 (頁碼 168 ~ 170)
- **網路資料爬蟲**：Amazon 或博客來書籍資訊擷取。
- **R Markdown 文件整合**：產出整合程式碼與圖表之 HTML 評量報告。
- **金融科技（FinTech）量化交易策略**：
  - 股票 K 線圖形態捕捉（如：黃昏之星）。
  - 動量交易策略（Momentum Trading Strategy）。
  - RSI 相對強弱指標超買/超賣交易信號。
  - 均線系統策略（SMA, WMA, EMA 買賣點判別）。

---

## 4. 常見問題與注意事項

- **本練習題庫適合哪些學習者？**  
  適合正在修習大專院校統計計算、資料科學導論、巨量資料分析或準備相關研究所考試的同學，題目設計循序漸進且皆有實務情境。
- **如何取得原始完整的題目 PDF？**  
  您可以直接由本站 assets 下載：[點此下載 R-exercise-v2021_9.pdf](assets/R-exercise-v2021_9.pdf)。
- **同主題後續補充規則**：  
  未來若有吳漢銘老師相關題目的解答程式碼、筆記心得或練習解題過程，將依據專案規範直接追加整合於本篇相應單元中。
