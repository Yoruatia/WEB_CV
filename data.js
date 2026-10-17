/* =========================================================================
   ALL EDITABLE CONTENT LIVES HERE
   ========================================================================= */

/* PROFILE PHOTO — path like "Aset/profile.jpg", or "" to keep the placeholder box. */
const PROFILE_PHOTO = "Aset/PP/pp.png";

/* -------------------------------------------------------------------------
   PATH-SPECIFIC TAGS  (pill tags under the hero description)
   ------------------------------------------------------------------------- */
const PATH_TAGS = [
  "Meteorological Instrumentation & IoT",
  "Data Science & Analysis",
  "Geospatial & Remote Sensing",
];

/* -------------------------------------------------------------------------
   TOOL BADGES  (shields.io badges in the hero)
   label: text on the badge. shields.io treats a single "-" as a separator,
          so write "--" for a literal dash (Scikit--learn) and "_" for a space.
   color: hex, no "#".
   logo:  optional Simple Icons slug. Leave it out when the tool has no
          official logo — a plain badge looks better than a wrong logo.
   ------------------------------------------------------------------------- */
const STACK_BADGES = [
  { label: "Python",        color: "3776AB", logo: "python" },
  { label: "NumPy",         color: "4D77CF", logo: "numpy" },
  { label: "Pandas",        color: "150458", logo: "pandas" },
  { label: "Matplotlib",    color: "11557C" },
  { label: "Seaborn",       color: "4C72B0" },
  { label: "Cartopy",       color: "2C5F8A" },
  { label: "Xarray",        color: "E58325" },
  { label: "Scikit--learn", color: "F7931E", logo: "scikitlearn" },
  { label: "R",             color: "276DC3", logo: "r" },
  { label: "RStudio",       color: "75AADB", logo: "rstudio" },
  { label: "terra",         color: "276DC3" },
  { label: "tmap",          color: "4E79A7" },
  { label: "tidyverse",     color: "1F9E89" },
  { label: "Fortran",       color: "734F96", logo: "fortran" },
  { label: "QGIS",          color: "589632", logo: "qgis" },
  { label: "FreeCAD",       color: "418FDE", logo: "freecad" },
  { label: "Arduino",       color: "00979D", logo: "arduino" },
  { label: "ESP32",         color: "E7352C", logo: "espressif" },
  { label: "MQTT",          color: "660066", logo: "mqtt" },
  { label: "MySQL",         color: "4479A1", logo: "mysql" },
  { label: "Excel",         color: "217346" },
  { label: "GitHub",        color: "181717", logo: "github" },
];

/* -------------------------------------------------------------------------
   SKILLS  (grouped tags)
   ------------------------------------------------------------------------- */
const SKILLS = [
  { cat: "Meteorological Instrumentation & IoT", tags: ["3D Design", "Sensor Integration", "Sensor Calibration", "Environmental Monitoring", "Embedded Systems", "IoT Communication", "Data Acquisition", "Instrument Testing"] },
  { cat: "Data Science & Analysis", tags: ["Data Cleaning & Preprocessing", "Exploratory Data Analysis", "Statistical Analysis", "Predictive Modeling", "Machine Learning", "Model Evaluation", "Data Visualization", "Dashboard Development"] },
  { cat: "Geospatial & Remote Sensing", tags: ["Spatial Analysis", "Cartography", "Geospatial Data Processing", "Remote Sensing Analysis", "Radar Data Processing", "Terrain Analysis", "Spatial Visualization"] },
  { cat: "Leadership & Communication", tags: ["Scientific Writing", "Teaching & Mentoring", "Team Leadership", "Problem Solving"] },
];

/* -------------------------------------------------------------------------
   EDUCATION
   ------------------------------------------------------------------------- */
const EDUCATION = [
  {
    school: "Institut Teknologi Bandung (ITB)",
    degree: "B.Sc. Meteorology — Faculty of Earth Sciences and Technology",
    period: "Jul 2024 – Oct 2028 (Expected)",
    note: "Dean's List — GPA 4.00, first-year common program (TPB)",
  },
];

/* -------------------------------------------------------------------------
   EXPERIENCE  (technical roles only)
   ------------------------------------------------------------------------- */
const EXPERIENCE = [
  {
    dur: "Feb 2026 – Jun 2026",
    title: "Practicum Assistant — Meteorological Observation",
    org: "Meteorology Study Program, ITB",
    bullets: [
      "Built five three-variable meteorological data-acquisition instruments for practicum sessions",
      "Calibrated the instruments and mentored 78 students in meteorological and hydrometeorological instrumentation",
    ],
  },
  {
    dur: "Jun 2025 – Present",
    title: "Lab Assistant — Meteorology Analysis Lab",
    org: "Meteorology Study Program, ITB",
    bullets: [
      "Support daily lab operations, instrument inventory, and equipment loan services",
      "Contribute to meteorological instrument development, including 3D design in FreeCAD",
      "Process, visualize, and interpret meteorological satellite and radar data",
    ],
  },
  {
    dur: "Feb 2025 – Jun 2025",
    title: "Teaching Assistant — Computational Thinking",
    org: "Faculty of Earth Sciences and Technology, ITB",
    bullets: [
      "Taught Python fundamentals and earth-science applications to 65 students",
      "Mentored 13 student project groups and graded assignments",
    ],
  },
];

/* -------------------------------------------------------------------------
   PROJECTS
   id:     short slug, no spaces (used internally to open the write-up)
   stack:  one comma-separated string
   ------------------------------------------------------------------------- */
const PROJECTS = [
  {
    id: "forest-carbon",
    emoji: "🌳",
    title: "Deforestation, Fragmentation & Forest Carbon Analysis in R",
    category: "Geospatial", status: "GeoSoftware #3", featured: true,
    images: Array.from({ length: 22 }, (_, i) => `Aset/Hutan/Hutan (${i + 1}).jpg`),
    desc: "An R-based assessment of forest loss, landscape fragmentation, and remaining carbon stock in the Aceh Tamiang–Langkat area of East Leuser, Sumatra (2000–2024).",
    tech: ["R", "terra", "sf", "landscapemetrics", "ggplot2", "Remote Sensing"],
    overview: "An end-to-end forest monitoring workflow in R for the Aceh Tamiang–Langkat buffer zone of the Leuser Ecosystem. It combines three analyses: annual deforestation tracking from 2000 to 2024 using Hansen Global Forest Change v1.12, landscape fragmentation for 2002, 2012, and 2022 using landscapemetrics, and a 2022 carbon stock estimate from ESA CCI Biomass. The area lost 37.9% of its 2000 forest cover (49,803 ha), the number of forest patches nearly doubled from 3,298 to 5,897, and the remaining forest still stores about 6.69 million tC (24.5 million tCO₂e).",
    contributions: [
      "Processed Hansen GFC tree-cover and annual-loss rasters with terra and sf, tested several canopy-cover thresholds, and adopted ≥75% as the forest definition",
      "Quantified annual deforestation from 2001 to 2024: total loss, average loss rate (2,075 ha/yr), peak year (2023), and the Puyravaud annual deforestation rate (−1.985%/yr)",
      "Measured fragmentation with landscapemetrics (NP, PD, AREA_MN, LPI, TCA, AI, DIVISION) using 4-direction connectivity and a 120 m edge depth, comparing 2002, 2012, and 2022",
      "Estimated 2022 carbon stock by masking ESA CCI above-ground biomass to the remaining forest, converting it to tC/ha, splitting low- and high-carbon zones at 35 tC/ha, and computing the CO₂ equivalent",
      "Visualized deforestation trends, patch distribution, and carbon maps with ggplot2 and gridExtra, and summarized the results as conservation insights",
    ],
    stack: "R, terra, sf, dplyr, tidyr, ggplot2, gridExtra, landscapemetrics, Hansen GFC v1.12, ESA CCI Biomass",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7513910481586233344/",
    linkLabel: "Read more →",
  },
  {
    id: "rainfall-ml",
    emoji: "🌧️",
    title: "Statistical Rainfall Prediction Model — Bandung",
    category: "Machine Learning", status: "Completed", featured: true, researchTag: true,
    images: Array.from({ length: 8 }, (_, i) => `Aset/ML_Hujan_Bandung/ml (${i + 1}).jpg`),
    desc: "A supervised machine-learning pipeline comparing Random Forest, KNN, and Logistic Regression to predict rainfall occurrence from historical meteorological records.",
    tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Seaborn", "EDA"],
    overview: "A classification pipeline that predicts whether it will rain in Bandung, built on 2019–2024 historical meteorological records. The workflow runs from data cleaning and preprocessing, through exploratory analysis of feature distributions and correlations, to training and comparing three classifiers: Random Forest, K-Nearest Neighbors, and Logistic Regression.",
    contributions: [
      "Cleaned and preprocessed 2019–2024 historical meteorological records",
      "Ran exploratory data analysis to understand feature distributions and correlations",
      "Trained and compared Random Forest, KNN, and Logistic Regression classifiers",
      "Handled tabular data across .xlsx and .csv formats in Python and Microsoft Excel",
    ],
    stack: "Python, Pandas, Scikit-learn, Matplotlib, Seaborn, Microsoft Excel",
    link: "https://lnkd.in/p/gYzHHjmq",
    linkLabel: "Read more →",
  },
  {
    id: "r-spatial-basics",
    emoji: "⛰️",
    title: "R Fundamentals for Spatial Data Analysis",
    category: "Geospatial", status: "GeoSoftware #2",
    images: Array.from({ length: 16 }, (_, i) => `Aset/Basic_R/R (${i + 1}).jpg`),
    desc: "A mini project applying R to DEM processing and elevation classification across two sub-districts in North Sumatra.",
    tech: ["R", "terra", "sf", "Raster Analysis", "GIS"],
    overview: "A hands-on elevation analysis using R's spatial packages for Pangaribuan and Tarutung sub-districts in North Sumatra. The workflow covers reading raster and vector data, aligning coordinate reference systems, cropping and masking the DEM to administrative boundaries, then classifying elevation zones and calculating the area of each.",
    contributions: [
      "Read and processed raster (DEM) and vector (administrative boundary) data with terra and sf",
      "Checked and aligned the coordinate reference systems of the DEM and the administrative shapefiles",
      "Cropped and masked the DEM to the boundaries of the two selected sub-districts",
      "Classified elevation into categorical classes and calculated each class's area in km² from pixel counts",
    ],
    stack: "R, terra, sf",
    link: "https://lnkd.in/p/gMmY_Zhr",
    linkLabel: "Read more →",
  },
  {
    id: "era5-advection",
    emoji: "🌡️",
    title: "Temperature Advection Analysis with ERA5 — Kalimantan",
    category: "Atmospheric Sciences", status: "Completed",
    images: Array.from({ length: 14 }, (_, i) => `Aset/Adveksi/Adveksi (${i + 1}).jpg`),
    desc: "Mapped horizontal temperature advection over Kalimantan from ERA5 reanalysis data to reveal how winds drive regional warming and cooling.",
    tech: ["Python", "ERA5", "NumPy", "Pandas", "Matplotlib", "Cartopy"],
    overview: "A computational analysis of horizontal temperature advection over Kalimantan on a 0.1° × 0.1° ERA5 grid. Using 2 m temperature and 10 m wind components, it calculates temperature gradients and advection rates to identify warm- and cold-advection patterns across a 24-hour period.",
    contributions: [
      "Extracted 2 m temperature (t2m) and 10 m wind components (u10, v10) from ERA5",
      "Calculated horizontal temperature gradients and advection rates (°C/hr) from the advection equation",
      "Identified a diurnal shift from warm advection in the early hours to cold advection from afternoon into the night",
      "Produced spatial maps of temperature distribution, wind vectors, and advection patterns",
    ],
    stack: "Python, NumPy, Pandas, Matplotlib, Cartopy, ERA5 reanalysis",
    link: "https://lnkd.in/p/gYVDAw6P",
    linkLabel: "Read more →",
  },
  {
    id: "cyclone-ellie-radar",
    emoji: "🌀",
    title: "Identifying Cyclone Ellie from Weather Radar Data",
    category: "Remote Sensing", status: "Completed", researchTag: true,
    images: Array.from({ length: 7 }, (_, i) => `Aset/Ellie Cyclone/radar (${i + 1}).jpg`),
    desc: "Processed, visualized, and interpreted AURA weather radar data to identify the spiral structure and rotation center of Cyclone Ellie.",
    tech: ["Python", "wradlib", "Xarray", "NumPy", "Fortran"],
    overview: "An analysis of AURA Level 2 radar data with Python and wradlib. Reflectivity, Column Maximum Reflectivity, and Azimuthal Shear products were used to trace the cyclone's spiral structure and locate its rotation center, where azimuthal shear reached about 1.5 s⁻¹.",
    contributions: [
      "Processed raw radar and satellite data with Python, Fortran, NumPy, and Xarray",
      "Visualized reflectivity, Column Maximum Reflectivity, and Azimuthal Shear products",
      "Identified Cyclone Ellie's spiral structure and rotation center from the radar products",
    ],
    stack: "Python, wradlib, Xarray, NumPy, Fortran",
    link: "https://lnkd.in/p/gcXy4gSY",
    linkLabel: "Read more →",
  },
  {
    id: "scout-buoy",
    emoji: "🌊",
    title: "SCOUT-Buoy (Smart Coastal Buoy)",
    category: "IoT", status: "Award-winning", researchTag: true,
    images: Array.from({ length: 17 }, (_, i) => `Aset/metday/buoy (${i + 1}).jpg`),
    desc: "First-place national essay proposing an IoT coastal buoy that detects high waves and sends visual warnings to an on-shore early-warning board.",
    tech: ["IoT", "Sensors", "Telemetry", "Instrumentation", "Disaster Mitigation"],
    overview: "SCOUT-Buoy is a proposed IoT early-warning system for high waves in coastal areas. Sensors on an offshore buoy collect wave data and transmit it to a Smart Warning Board on shore, which shows a visual alert so coastal communities can respond quickly.",
    contributions: [
      "Co-developed the system concept with teammates from Meteorology and Civil Engineering",
      "Wrote the essay that won 1st place at the Meteorology Day Essay Competition, Himagreto IPB, 2025",
    ],
    stack: "IoT, sensors, telemetry, web integration",
    link: "https://itb.ac.id/news/itb-students-create-iot-based-solution-for-early-warning-of-high-waves/62240",
    linkLabel: "Read the ITB news →",
  },
  {
    id: "vietnam-terrain",
    emoji: "🗺️",
    title: "Vietnam Terrain Mapping",
    category: "Geospatial", status: "Completed",
    images: Array.from({ length: 2 }, (_, i) => `Aset/Vietnam_Terrain/vietnam (${i + 1}).jpg`),
    desc: "A terrain map of Vietnam built entirely in QGIS, from hillshade generation to a print-ready layout.",
    tech: ["QGIS", "Hillshade", "Cartography", "Layout Design"],
    overview: "A cartographic terrain map of Vietnam produced end-to-end in QGIS. Elevation data was rendered as hillshade relief, styled with terrain symbology, and finished as a print-ready map layout.",
    contributions: [
      "Generated hillshade and terrain relief layers from elevation data",
      "Designed the symbology, cartographic styling, and final print layout",
    ],
    stack: "QGIS",
    link: "https://lnkd.in/p/gedunWfZ",
    linkLabel: "Read more →",
  },
  {
    id: "bmkg-api",
    emoji: "📡",
    title: "Weather Data Scraping from the BMKG API",
    category: "Data Science", status: "Completed",
    images: Array.from({ length: 5 }, (_, i) => `Aset/Scrap_BMKG/API (${i + 1}).jpg`),
    desc: "A reusable Python pipeline that collects and structures weather forecasts from BMKG's Open API for locations across Indonesia.",
    tech: ["Python", "Pandas", "REST API", "Data Wrangling"],
    overview: "An automated pipeline that retrieves 3-hourly weather forecasts for villages and urban wards across Indonesia from BMKG's Open API. It extracts key meteorological parameters and exports structured datasets with location metadata, ready for analysis or for use in other applications.",
    contributions: [
      "Built a Python client for BMKG's Open API",
      "Extracted temperature, humidity, wind, cloud cover, and visibility forecasts",
      "Automated data structuring and Excel dataset export with location metadata",
    ],
    stack: "Python, Pandas, BMKG Open API, Microsoft Excel",
    link: "https://lnkd.in/p/ehE4C8RU",
    linkLabel: "Read more →",
  },
  {
    id: "python-basics",
    emoji: "🐍",
    title: "Python Programming Basics for Data Analysis",
    category: "Data Science", status: "GeoSoftware #1",
    images: Array.from({ length: 19 }, (_, i) => `Aset/Basic_Python/Basic (${i + 1}).jpg`),
    desc: "Foundational Python training covering core programming and basic data analysis workflows.",
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
    overview: "Hands-on exercises covering Python syntax, data structures, control flow, and functions, followed by basic data analysis: building DataFrames, visualizing data, and evaluating a simple machine-learning model.",
    contributions: [
      "Implemented program logic with conditionals (if-else), loops (while, for), and custom functions",
      "Processed user input, formatted dynamic string output, and performed arithmetic across data types",
      "Generated synthetic datasets with NumPy and built structured DataFrames with Pandas",
      "Created scatter plots with Matplotlib and evaluated a basic model with Scikit-learn (train-test split, accuracy score, confusion matrix)",
    ],
    stack: "Python, NumPy, Pandas, Matplotlib, Scikit-learn",
    link: "https://lnkd.in/p/gExpxrP6",
    linkLabel: "Read more →",
  },
];

/* -------------------------------------------------------------------------
   LINKS ROW  (icon: linkedin | email | cv | github | instagram)
   ------------------------------------------------------------------------- */
const LINKS_ROW = [
  { icon: "linkedin",  name: "LinkedIn",              url: "https://linkedin.com/in/shendi-ginting" },
  { icon: "email",     name: "Email",                 url: "mailto:erexo32@gmail.com" },
  { icon: "cv",        name: "Curriculum Vitae (CV)", url: "Aset//CV_Shendi Moses Ginting_ATS.pdf", download: true },
  { icon: "github",    name: "GitHub",                url: "https://github.com/Yoruatia" },
  { icon: "instagram", name: "Instagram",             url: "https://www.instagram.com/erexo_yor/" },
];