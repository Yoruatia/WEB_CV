/* 1. PROFILE PHOTO — set to a path like "Aset/profile.jpg" to replace the
   hero placeholder, or leave it as "" to keep the placeholder box. */
const PROFILE_PHOTO = "Aset/PP/pp.png";

/* -------------------------------------------------------------------------
   4. PATH-SPECIFIC TAGS  (shown as pill tags under the hero description)
   ------------------------------------------------------------------------- */
const PATH_TAGS = [
  "Meteorological Instrumentation & IoT",
  "Data Science & Analysis",
  "Geospatial & Remote Sensing",
];

/* -------------------------------------------------------------------------
   5. SPECIFIC SKILL BADGES  (shields.io badges shown in the hero)
   label: text on the badge. Use "--" to show a literal "-" (e.g. Scikit--learn).
   Use "_" to show a space (e.g. ROS_2 -> "ROS 2").
   color: hex color, no "#".
   logo: optional simple-icons slug (leave out the line if unsure — it still
   renders fine as a plain colored badge without a logo).
   ------------------------------------------------------------------------- */
const STACK_BADGES = [
  { label: "Python",        color: "3776AB", logo: "python" },
  { label: "NumPy",         color: "4D77CF", logo: "numpy" },
  { label: "Pandas",        color: "150458", logo: "pandas" },
  { label: "Matplotlib",    color: "11557C", logo: "matplotlib" },
  { label: "Seaborn",       color: "4C72B0", logo: "python" },
  { label: "Cartopy",       color: "2C5F8A", logo: "python" },
  { label: "Xarray",        color: "E58325" },
  { label: "Scikit-learn",  color: "F7931E", logo: "scikitlearn" },
  { label: "RStudio",       color: "75AADB", logo: "rstudio" },
  { label: "Terra",         color: "276DC3", logo: "r" },
  { label: "tmap",          color: "4E79A7", logo: "r" },
  { label: "tidyverse",     color: "1F9E89", logo: "r" },
  { label: "Fortran",       color: "734F96" },
  { label: "QGIS",          color: "589632", logo: "qgis" },
  { label: "FreeCAD",       color: "618893" },
  { label: "Arduino",       color: "00979D", logo: "arduino" },
  { label: "ESP32",         color: "E7352C" },
  { label: "MQTT",          color: "660066", logo: "mqtt" },
  { label: "Excel",         color: "217346", logo: "microsoftexcel" },
  { label: "MySQL",         color: "4479A1", logo: "mysql" },
  { label: "GitHub",        color: "181717", logo: "github" }
];

/* -------------------------------------------------------------------------
   SKILLS SECTION  (grouped tags, unchanged from before)
   ------------------------------------------------------------------------- */
const SKILLS = [
  { cat: "Meteorological Instrumentation & IoT", tags: ["3D Design", "Sensor Integration", "Sensor Calibration", "Environmental Monitoring", "Embedded Systems", "IoT Communication", "Data Acquisition", "Instrument Testing"] },
  { cat: "Data Science & Analysis", tags: ["Data Cleaning & Preprocessing", "Exploratory Data Analysis", "Statistical Analysis", "Predictive Modeling", "Machine Learning", "Model Evaluation", "Data Visualization", "Dashboard Development"] },
  { cat: "Geospatial & Remote Sensing", tags: ["Spatial Analysis", "Cartography", "Geospatial Data Processing", "Remote Sensing Analysis", "Radar Data Processing", "Terrain Analysis", "Spatial Visualization"] },
  { cat: "Leadership & Communication", tags: ["Scientific Writing", "Teaching & Mentoring", "Team Leadership", "Problem Solving"] },
];

/* -------------------------------------------------------------------------
   EDUCATION  (kept to one entry on purpose — just university)
   ------------------------------------------------------------------------- */
const EDUCATION = [
  {
    school: "Institut Teknologi Bandung (ITB)",
    degree: "B.Sc. Meteorology — Faculty of Earth Sciences and Technology",
    period: "Jul 2024 – Oct 2028 (Expected)",
    note: "Dean's List — GPA 4.0, first semester (TPB)",
  },
];

/* -------------------------------------------------------------------------
   EXPERIENCE  (technical roles only — no organizational/leadership roles)
   ------------------------------------------------------------------------- */
const EXPERIENCE = [
  {
    dur: "Feb 2026 – Jun 2026",
    title: "Practicum Assistant — Meteorological Observation",
    org: "Program Studi Meteorologi, ITB",
    bullets: [
      "Built 5 three-variable meteorological data-acquisition instruments for practicum use",
      "Calibrated instruments and mentored 78 students in meteorological & hydrometeorological instrumentation",
    ],
  },
  {
    dur: "Jun 2025 – Present",
    title: "Lab Assistant, Meteorology Analysis Lab",
    org: "Program Studi Meteorologi, ITB",
    bullets: [
      "Support lab operations, instrument management, and equipment loan services",
      "Contribute to meteorological instrument development, including 3D design in FreeCAD",
      "Process, visualize, and interpret satellite and radar meteorological data",
    ],
  },
  {
    dur: "Feb 2025 – Jun 2025",
    title: "Teaching Assistant — Computational Thinking",
    org: "Fakultas Ilmu dan Teknologi Kebumian, ITB",
    bullets: [
      "Taught Python fundamentals and earth-science applications to 65 students",
      "Mentored 13 student project groups and evaluated assignments",
    ],
  },
];

/* -------------------------------------------------------------------------
   ------------------------------------------------------------------------- */
const PROJECTS = [
  {
    id: "scout-buoy", emoji: "🌊", title: "SCOUT-Buoy (Smart Coastal Buoy)",
    category: "IoT", status: "Award-winning", featured: true, researchTag: true,
    images: Array.from({ length: 17 }, (_, i) => `Aset/metday/buoy (${i + 1}).jpg`),
    desc: "National 1st-place essay concept for an IoT coastal buoy that detects high waves and pushes visual warnings to a coastal early-warning board.",
    tech: ["IoT", "Sensors", "Instrumentation", "Hardware Connectivity", "Disaster Mitigation", "Web Integration"],
    overview: "SCOUT-Buoy (Smart Coastal Buoy) is a proposal for an IoT-based early warning system for high waves in coastal areas. Sensors mounted on offshore buoys collect wave data, transmitted to a Smart Warning Board on shore that displays a visual indicator.",
    contributions: [
      "Co-developed the system concept with team members from Meteorology and Civil Engineering",
      "Wrote the essay that won 1st place at the Meteorology Day Essay Competition, Himagreto IPB, 2025",
    ],
    stack: ["IoT | Instrumentation | Telemetry | Meteorology"],
    link: "https://itb.ac.id/news/itb-students-create-iot-based-solution-for-early-warning-of-high-waves/62240",
    linkLabel: "Read more",
  },
  
  {
    id: "rainfall-ml", emoji: "🌧️", title: "Statistical Rainfall Prediction Model - Bandung",
    category: "Machine Learning", status: "Completed", featured: true, researchTag: true,
    images: Array.from({ length: 8 }, (_, i) => `Aset/ML_Hujan_Bandung/ml (${i + 1}).jpg`),
    desc: "A supervised ML pipeline comparing Random Forest, KNN, and Logistic Regression to predict rainfall occurrence from historical meteorological records.",
    tech: ["Python", "Scikit-learn", "Random Forest", "KNN", "Logistic Regression", "EDA", "Pandas", "Matplotlib", "Seaborn"],
    overview: "Performed data cleaning and preprocessing on historical meteorological records from 2019–2024, followed by exploratory data analysis to examine feature distributions and correlations. Trained and compared Random Forest, KNN, and Logistic Regression classifiers, while processing tabular datasets in .xlsx and .csv formats using Python and Microsoft Excel.",
    contributions: [
      "Do data cleaning and preprocessing on historical meteorological records from 2019–2024",
      "Ran exploratory data analysis to understand feature distributions and correlations",
      "Trained and compared Random Forest, KNN, and Logistic Regression classifiers",
      "Processed tabular data across .xlsx and .csv formats in Python and MS Excel",
    ],
    stack: ["Python | Scikit-learn | MS Excel for auxiliary data handling"],
    link: "https://lnkd.in/p/gYzHHjmq",
    linkLabel: "Read more",
  },

  {
    id: "Advection", emoji: "🌧️", title: "Temperature Advection Type Analysis using ERA5 Data - Kalimantan",
    category: "Atmospheric Sciences", status: "Completed",
    images:  Array.from({ length: 14 }, (_, i) => `Aset/Adveksi/Adveksi (${i + 1}).jpg`),
    desc: "Analyzed horizontal temperature advection dynamics in Kalimantan using ERA5 reanalysis data to map wind patterns and regional temperature changes[cite: 1].",
    tech: ["Python", "ERA5 Reanalysis Data", "Spatial Analysis", "Meteorological Data"],
    overview: "Developed a computational analysis using ERA5 reanalysis data to map horizontal temperature advection across a 0.1° x 0.1° grid in Kalimantan. The project calculates zonal/meridional wind components and temperature gradients to identify warm and cold advection patterns over a 24-hour period.",
    contributions: [
      "Extracted temperature (t2m) and wind components (u10, v10) from ERA5 datasets",
      "Calculated horizontal temperature gradients and advection rates (°C/hr) using advection equations",
      "Identified diurnal shifts between warm advection during early hours and cold advection from afternoon to night",
      "Generated spatial visualization maps for temperature distribution, wind vectors, and advection patterns"
    ],
    stack: "Python, ERA5, NumPy, Pandas, Matplotlib, Cartopy.",
    link: "https://lnkd.in/p/gYVDAw6P",
    linkLabel: "Read more",
  },

  {
    id: "radar-satellite", emoji: "🛰️", title: "Cyclone Ellie Identification Through Radar Data Analysis",
    category: "Remote Sensing", status: "Completed", researchTag: true,
    images: Array.from({ length: 7 }, (_, i) => `Aset/Ellie Cyclone/radar (${i + 1}).jpg`),
    desc: "Processing, visualizing, and interpreting meteorological radar data from AURA to identify the spiral structure and rotation center of Cyclone Ellie",
    tech: ["Python", "Fortran", "NumPy", "Xarray", "Radar Visualization", "Wradlib"],
    overview: "Processed AURA Level 2 radar data with Python wradlib to analyze reflectivity, Column Maximum Reflectivity, and Azimuthal Shear, identifying the cyclone’s spiral structure and rotation center with AZ Shear up to ~1.5 s⁻¹.",
    contributions: [
      "Process raw radar and satellite data using Python, Fortran, NumPy, and Xarray",
      "Produce radar data visualizations and identify the cyclone's spiral structure and rotation center of Cyclone Ellie",
    ],
    stack: "Python, Fortran, NumPy, Xarray, Wradlib",
    link: "https://lnkd.in/p/gcXy4gSY",
    linkLabel: "Read more",
  },

  {
    id: "vietnam-terrain", emoji: "🗺️", title: "Vietnam Terrain Mapping",
    category: "Geospatial", status: "Completed",
    images: Array.from({ length: 2 }, (_, i) => `Aset/Vietnam_Terrain/vietnam (${i + 1}).jpg`),
    desc: "A cartographic terrain-mapping exercise of Vietnam built entirely in QGIS, from hillshade generation to final print layout.",
    tech: ["QGIS", "GIS Analysis", "Hillshade", "Cartography", "Layout Design"],
    overview: "A terrain-mapping project covering Vietnam, produced end-to-end in QGIS: elevation analysis, hillshade rendering, symbology, and a print-ready cartographic layout.",
    contributions: [
      "Generated hillshade and terrain relief layers in QGIS",
      "Designed the final map layout and cartographic styling",
    ],
    stack: "QGIS",
    link: "https://lnkd.in/p/gedunWfZ",
    linkLabel: "Read more",
  },

  {
    id: "Data-Scraping", emoji: "🌧️", title: "Data Scraping from BMKG API",
    category: "Data Science", status: "Completed",
    images: Array.from({ length: 5 }, (_, i) => `Aset/Scrap_BMKG/API (${i + 1}).jpg`),
  desc: "Built a reusable Python pipeline to collect and structure real-time weather forecast data from BMKG's Open API for locations across Indonesia.",
  tech: ["Python", "API Integration", "Pandas", "Data Wrangling", "Meteorological Data"],
  overview: "Developed an automated pipeline that retrieves 3-hourly weather forecasts for villages and urban wards across Indonesia, processes key meteorological parameters, and exports structured datasets with location metadata for further analysis or application integration.",
  contributions: [
    "Developed a Python scraper for BMKG's Open API",
    "Extracted temperature, humidity, wind, cloud cover, and visibility data",
    "Automated data structuring and Excel dataset generation"
  ],
  stack: "Python, Pandas, BMKG Open API, Excel.",
  link: "https://lnkd.in/p/ehE4C8RU",
  linkLabel: "Read more",
  },
  {
  id: "Basic-Data Analysis", emoji: "🌧️", title: "Python Programming Basics for Data Analysis",
  category: "Data Science", status: "GeoSoftware #1",
  images: Array.from({ length: 19 }, (_, i) => `Aset/Basic_Python/Basic (${i + 1}).jpg`),
  desc: "Completed basic Python training focused on foundational programming and core data analysis workflows.",
  tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-Learn"],
  overview: "Completed hands-on practical exercises covering basic Python syntax, data structures, conditional control flows, functions, and fundamental data analysis workflows including data visualization and basic machine learning evaluation metrics.",
  contributions: [
    "Implemented core programming logic using conditional statements (if-else), loops (while, for), and custom functions",
    "Processed user inputs, formatted dynamic string outputs, and executed mathematical operations across multiple data types",
    "Generated synthetic datasets using NumPy and built structured DataFrames with Pandas",
    "Created data visualizations such as scatter plots using Matplotlib and evaluated basic machine learning models using Scikit-Learn (train-test split, accuracy score, and confusion matrix)"
  ],
  stack: "Python, Pandas, NumPy, Matplotlib, Scikit-Learn.",
  link: "https://lnkd.in/p/gExpxrP6",
  linkLabel: "Read more",
  },
  {
  id: "Spatial-Data Analysis", emoji: "🗺️", title: "Dasar R untuk Analisis Data Spasial",
  category: "Geospatial", status: "GeoSoftware #2",
  images: Array.from({ length: 16 }, (_, i) => `Aset/Basic_R/R (${i + 1}).jpg`),
  desc: "Completed a mini project applying R for spatial data analysis, focused on DEM processing and elevation classification across two sub-districts.",
  tech: ["R", "terra", "sf", "Raster Analysis", "GIS"],
  overview: "Completed a hands-on mini project analyzing elevation data using R's spatial packages, covering the full workflow from reading raster and vector data to reprojecting, cropping, classifying, and quantifying elevation zones across Kecamatan Pangaribuan and Kecamatan Tarutung in North Sumatra.",
  contributions: [
    "Read and processed raster (DEM) and vector (administrative boundary) spatial data using the terra and sf packages in R",
    "Checked and aligned coordinate reference systems (CRS) between the DEM raster and administrative shapefiles",
    "Cropped and masked DEM rasters based on administrative boundaries for two selected sub-districts",
    "Classified elevation values into categorical classes and calculated the area of each class in km² through pixel-based frequency analysis"
  ],
  stack: "R, terra, sf, raster classification, spatial data visualization.",
  link: "https://lnkd.in/p/gMmY_Zhr",
  linkLabel: "Read more",
  },
];


const LINKS_ROW = [
  { icon: "linkedin", name: "LinkedIn", url: "https://linkedin.com/in/shendi-ginting" },
  { icon: "email",    name: "Email", url: "mailto:erexo32@gmail.com" },
  { icon: "cv",       name: "Curriculum Vitae (CV)", url: "Aset//CV_Shendi Moses Ginting_ATS.pdf", download: true },
  { icon: "github",   name: "GitHub", url: "https://github.com/Yoruatia" },
  { icon: "instagram", name: "Instagram", url: "https://www.instagram.com/erexo_yor/" },
];
