import { Subject } from "./types";

export const SUBJECTS: Subject[] = [
  // Common Sem 1-2
  { id: "math1", name: "Engineering Mathematics I", code: "MA101", semester: 1, branchIds: ["cse","it","aids","ece","ee","me","ce","mech","chem"], credits: 4, units: [
    { id: "math1-u1", name: "Matrices & Linear Algebra", topics: ["Eigenvalues","Eigenvectors","Cayley-Hamilton","Diagonalization","Linear Transformations"] },
    { id: "math1-u2", name: "Differential Calculus", topics: ["Limits","Continuity","Partial Derivatives","Maxima & Minima","Taylor Series"] },
    { id: "math1-u3", name: "Integral Calculus", topics: ["Double Integrals","Triple Integrals","Change of Order","Beta & Gamma Functions","Applications"] },
    { id: "math1-u4", name: "Vector Calculus", topics: ["Gradient","Divergence","Curl","Green's Theorem","Stokes Theorem"] },
    { id: "math1-u5", name: "Differential Equations", topics: ["First Order ODE","Higher Order ODE","Laplace Transform","Inverse Laplace","Applications of ODE"] },
  ]},
  { id: "phy1", name: "Engineering Physics", code: "PH101", semester: 1, branchIds: ["cse","it","aids","ece","ee","me","ce","mech","chem"], credits: 3, units: [
    { id: "phy1-u1", name: "Wave Optics", topics: ["Interference","Diffraction","Polarization","Lasers","Fiber Optics"] },
    { id: "phy1-u2", name: "Quantum Mechanics", topics: ["Wave-Particle Duality","Schrodinger Equation","Uncertainty Principle","Quantum Numbers","Band Theory"] },
    { id: "phy1-u3", name: "Electromagnetism", topics: ["Gauss Law","Ampere Law","Faraday Law","Maxwell Equations","EM Waves"] },
    { id: "phy1-u4", name: "Semiconductor Physics", topics: ["Energy Bands","PN Junction","Transistors","Hall Effect","Superconductivity"] },
    { id: "phy1-u5", name: "Modern Physics", topics: ["Special Relativity","Photoelectric Effect","Compton Effect","Nuclear Physics","Nanotechnology"] },
  ]},
  { id: "chem1", name: "Engineering Chemistry", code: "CH101", semester: 1, branchIds: ["cse","it","aids","ece","ee","me","ce","mech","chem"], credits: 3, units: [
    { id: "chem1-u1", name: "Atomic & Molecular Structure", topics: ["Atomic Orbitals","Molecular Orbital Theory","Hybridization","Bond Parameters","Intermolecular Forces"] },
    { id: "chem1-u2", name: "Electrochemistry", topics: ["Electrode Potential","Nernst Equation","Batteries","Fuel Cells","Corrosion"] },
    { id: "chem1-u3", name: "Polymers", topics: ["Classification","Polymerization","Thermoplastics","Thermosets","Conducting Polymers"] },
    { id: "chem1-u4", name: "Water Technology", topics: ["Hardness","Softening","Desalination","BOD & COD","Water Treatment"] },
    { id: "chem1-u5", name: "Spectroscopy", topics: ["UV-Vis","IR Spectroscopy","NMR","Mass Spectrometry","Applications"] },
  ]},
  { id: "bee", name: "Basic Electrical Engineering", code: "EE101", semester: 2, branchIds: ["cse","it","aids","ece","ee","me","ce","mech","chem"], credits: 3, units: [
    { id: "bee-u1", name: "DC Circuits", topics: ["KVL & KCL","Mesh Analysis","Node Analysis","Thevenin Theorem","Norton Theorem"] },
    { id: "bee-u2", name: "AC Circuits", topics: ["Phasors","Impedance","Resonance","Power Factor","Three Phase Systems"] },
    { id: "bee-u3", name: "Transformers", topics: ["Working Principle","EMF Equation","Losses","Efficiency","Auto-transformer"] },
    { id: "bee-u4", name: "Electrical Machines", topics: ["DC Motor","Induction Motor","Synchronous Machine","Stepper Motor","Servo Motor"] },
    { id: "bee-u5", name: "Electrical Installations", topics: ["Wiring Systems","Earthing","Fuses & MCB","Tariff","Safety Measures"] },
  ]},
  { id: "pps", name: "Programming for Problem Solving", code: "CS101", semester: 1, branchIds: ["cse","it","aids","ece","ee","me","ce","mech","chem"], credits: 4, units: [
    { id: "pps-u1", name: "Introduction to C", topics: ["Data Types","Operators","Input/Output","Control Flow","Loops"] },
    { id: "pps-u2", name: "Arrays & Strings", topics: ["1D Arrays","2D Arrays","String Functions","Sorting","Searching"] },
    { id: "pps-u3", name: "Functions & Recursion", topics: ["Function Declaration","Pass by Value","Pass by Reference","Recursive Functions","Storage Classes"] },
    { id: "pps-u4", name: "Pointers & Structures", topics: ["Pointer Arithmetic","Dynamic Memory","Structures","Unions","Typedef"] },
    { id: "pps-u5", name: "File Handling", topics: ["File Operations","Text Files","Binary Files","Command Line Args","Preprocessor"] },
  ]},
  { id: "math2", name: "Engineering Mathematics II", code: "MA201", semester: 2, branchIds: ["cse","it","aids","ece","ee","me","ce","mech","chem"], credits: 4, units: [
    { id: "math2-u1", name: "Complex Analysis", topics: ["Analytic Functions","Cauchy-Riemann","Conformal Mapping","Contour Integration","Residues"] },
    { id: "math2-u2", name: "Probability & Statistics", topics: ["Random Variables","Distributions","Hypothesis Testing","Regression","Correlation"] },
    { id: "math2-u3", name: "Numerical Methods", topics: ["Root Finding","Interpolation","Numerical Integration","ODE Solutions","Curve Fitting"] },
    { id: "math2-u4", name: "Fourier Series", topics: ["Fourier Coefficients","Half Range","Fourier Transform","DFT","Applications"] },
    { id: "math2-u5", name: "PDE", topics: ["Classification","Heat Equation","Wave Equation","Laplace Equation","Separation of Variables"] },
  ]},
  // CSE subjects sem 3-8
  { id: "dsa", name: "Data Structures & Algorithms", code: "CS201", semester: 3, branchIds: ["cse","it","aids"], credits: 4, units: [
    { id: "dsa-u1", name: "Arrays & Linked Lists", topics: ["Array Operations","Singly Linked List","Doubly Linked List","Circular List","Skip List"] },
    { id: "dsa-u2", name: "Stacks & Queues", topics: ["Stack Implementation","Infix to Postfix","Queue Variants","Deque","Priority Queue"] },
    { id: "dsa-u3", name: "Trees", topics: ["Binary Tree","BST","AVL Tree","B-Tree","Heap"] },
    { id: "dsa-u4", name: "Graphs", topics: ["Representation","BFS","DFS","Shortest Path","MST"] },
    { id: "dsa-u5", name: "Sorting & Searching", topics: ["Quick Sort","Merge Sort","Heap Sort","Hashing","String Matching"] },
  ]},
  { id: "os", name: "Operating Systems", code: "CS301", semester: 4, branchIds: ["cse","it"], credits: 4, units: [
    { id: "os-u1", name: "Process Management", topics: ["Process States","Scheduling","Threads","IPC","Synchronization"] },
    { id: "os-u2", name: "Memory Management", topics: ["Paging","Segmentation","Virtual Memory","Page Replacement","Thrashing"] },
    { id: "os-u3", name: "File Systems", topics: ["File Organization","Directory Structure","Allocation Methods","Free Space","Disk Scheduling"] },
    { id: "os-u4", name: "Deadlocks", topics: ["Conditions","Prevention","Avoidance","Detection","Recovery"] },
    { id: "os-u5", name: "Protection & Security", topics: ["Access Control","Authentication","Encryption","Malware","Firewalls"] },
  ]},
  { id: "dbms", name: "Database Management Systems", code: "CS302", semester: 4, branchIds: ["cse","it","aids"], credits: 4, units: [
    { id: "dbms-u1", name: "Relational Model", topics: ["ER Diagrams","Relational Algebra","Tuple Calculus","Keys","Constraints"] },
    { id: "dbms-u2", name: "SQL", topics: ["DDL","DML","Joins","Subqueries","Views"] },
    { id: "dbms-u3", name: "Normalization", topics: ["Functional Dependencies","1NF to BCNF","Decomposition","Lossless Join","Dependency Preservation"] },
    { id: "dbms-u4", name: "Transactions", topics: ["ACID Properties","Concurrency Control","Locking","Timestamp","Recovery"] },
    { id: "dbms-u5", name: "Indexing & Hashing", topics: ["B+ Tree","Hash Index","Bitmap","Query Optimization","NoSQL Basics"] },
  ]},
  { id: "cn", name: "Computer Networks", code: "CS401", semester: 5, branchIds: ["cse","it"], credits: 4, units: [
    { id: "cn-u1", name: "Physical & Data Link Layer", topics: ["Transmission Media","Framing","Error Detection","Flow Control","MAC Protocols"] },
    { id: "cn-u2", name: "Network Layer", topics: ["IP Addressing","Subnetting","Routing Algorithms","OSPF","BGP"] },
    { id: "cn-u3", name: "Transport Layer", topics: ["TCP","UDP","Congestion Control","Flow Control","Socket Programming"] },
    { id: "cn-u4", name: "Application Layer", topics: ["HTTP","DNS","FTP","SMTP","DHCP"] },
    { id: "cn-u5", name: "Network Security", topics: ["Cryptography","SSL/TLS","Firewalls","VPN","IPSec"] },
  ]},
  { id: "ml", name: "Machine Learning", code: "CS501", semester: 6, branchIds: ["cse","aids"], credits: 4, units: [
    { id: "ml-u1", name: "Supervised Learning", topics: ["Linear Regression","Logistic Regression","SVM","Decision Trees","Random Forests"] },
    { id: "ml-u2", name: "Unsupervised Learning", topics: ["K-Means","Hierarchical Clustering","PCA","t-SNE","Anomaly Detection"] },
    { id: "ml-u3", name: "Neural Networks", topics: ["Perceptron","Backpropagation","CNN","RNN","Transformers"] },
    { id: "ml-u4", name: "Model Evaluation", topics: ["Cross Validation","Bias-Variance","ROC Curve","Precision-Recall","Hyperparameter Tuning"] },
    { id: "ml-u5", name: "Advanced Topics", topics: ["Ensemble Methods","GANs","Reinforcement Learning","Transfer Learning","AutoML"] },
  ]},
  { id: "se", name: "Software Engineering", code: "CS601", semester: 6, branchIds: ["cse","it"], credits: 3, units: [
    { id: "se-u1", name: "Software Process", topics: ["SDLC Models","Agile","Scrum","DevOps","CI/CD"] },
    { id: "se-u2", name: "Requirements Engineering", topics: ["Elicitation","Analysis","Specification","Validation","Management"] },
    { id: "se-u3", name: "Software Design", topics: ["Design Patterns","UML","Architecture","Cohesion","Coupling"] },
    { id: "se-u4", name: "Testing", topics: ["Unit Testing","Integration Testing","System Testing","Test Automation","TDD"] },
    { id: "se-u5", name: "Project Management", topics: ["Estimation","Planning","Risk Management","Quality Assurance","Maintenance"] },
  ]},
  { id: "cc", name: "Cloud Computing", code: "CS701", semester: 7, branchIds: ["cse","it","aids"], credits: 3, units: [
    { id: "cc-u1", name: "Cloud Fundamentals", topics: ["Service Models","Deployment Models","Virtualization","Containers","Serverless"] },
    { id: "cc-u2", name: "Cloud Platforms", topics: ["AWS","Azure","GCP","OpenStack","Kubernetes"] },
    { id: "cc-u3", name: "Cloud Storage", topics: ["Object Storage","Block Storage","CDN","Database Services","Caching"] },
    { id: "cc-u4", name: "Cloud Security", topics: ["IAM","Encryption","Compliance","Zero Trust","Security Groups"] },
    { id: "cc-u5", name: "Cloud Architecture", topics: ["Microservices","Load Balancing","Auto Scaling","Disaster Recovery","Cost Optimization"] },
  ]},
  // ECE subjects
  { id: "signals", name: "Signals & Systems", code: "EC301", semester: 3, branchIds: ["ece","ee"], credits: 4, units: [
    { id: "sig-u1", name: "Signal Classification", topics: ["Continuous & Discrete","Periodic & Aperiodic","Energy & Power","Elementary Signals","Operations"] },
    { id: "sig-u2", name: "LTI Systems", topics: ["Convolution","Impulse Response","Causality","Stability","BIBO Stability"] },
    { id: "sig-u3", name: "Fourier Analysis", topics: ["Fourier Series","CTFT","DTFT","DFT","FFT"] },
    { id: "sig-u4", name: "Laplace Transform", topics: ["ROC","Properties","Inverse","Transfer Function","Stability Analysis"] },
    { id: "sig-u5", name: "Z-Transform", topics: ["Definition","Properties","Inverse","System Analysis","Filter Design"] },
  ]},
  { id: "dcom", name: "Digital Communication", code: "EC401", semester: 4, branchIds: ["ece"], credits: 4, units: [
    { id: "dcom-u1", name: "Sampling & Quantization", topics: ["Nyquist Theorem","Aliasing","PCM","DPCM","Delta Modulation"] },
    { id: "dcom-u2", name: "Digital Modulation", topics: ["ASK","FSK","PSK","QAM","OFDM"] },
    { id: "dcom-u3", name: "Error Control", topics: ["Hamming Code","CRC","Convolutional Codes","Turbo Codes","LDPC"] },
    { id: "dcom-u4", name: "Information Theory", topics: ["Entropy","Channel Capacity","Shannon Theorem","Source Coding","Huffman Coding"] },
    { id: "dcom-u5", name: "Spread Spectrum", topics: ["DSSS","FHSS","CDMA","Pseudo-Random Sequences","Applications"] },
  ]},
  // EE subjects
  { id: "psys", name: "Power Systems", code: "EE401", semester: 5, branchIds: ["ee"], credits: 4, units: [
    { id: "psys-u1", name: "Power Generation", topics: ["Thermal Plant","Hydro Plant","Nuclear Plant","Solar","Wind Energy"] },
    { id: "psys-u2", name: "Transmission", topics: ["Line Parameters","ABCD Parameters","Surge Impedance","Corona","Insulators"] },
    { id: "psys-u3", name: "Distribution", topics: ["Radial System","Ring System","Substations","Protection","Grounding"] },
    { id: "psys-u4", name: "Load Flow", topics: ["Bus Classification","Gauss-Seidel","Newton-Raphson","Fast Decoupled","Contingency"] },
    { id: "psys-u5", name: "Stability", topics: ["Swing Equation","Equal Area Criterion","Multi-machine","FACTS","Smart Grid"] },
  ]},
  // ME subjects
  { id: "thermo", name: "Engineering Thermodynamics", code: "ME301", semester: 3, branchIds: ["me","chem"], credits: 4, units: [
    { id: "thermo-u1", name: "Basic Concepts", topics: ["System & Surroundings","Properties","Equilibrium","Processes","Zeroth Law"] },
    { id: "thermo-u2", name: "First Law", topics: ["Energy Balance","Enthalpy","Specific Heats","Steady Flow","Unsteady Flow"] },
    { id: "thermo-u3", name: "Second Law", topics: ["Kelvin-Planck","Clausius","Carnot Cycle","Entropy","Exergy"] },
    { id: "thermo-u4", name: "Power Cycles", topics: ["Otto Cycle","Diesel Cycle","Brayton Cycle","Rankine Cycle","Combined Cycle"] },
    { id: "thermo-u5", name: "Refrigeration", topics: ["Vapor Compression","Absorption","Air Conditioning","Heat Pumps","Cryogenics"] },
  ]},
  { id: "fmech", name: "Fluid Mechanics", code: "ME401", semester: 4, branchIds: ["me","ce"], credits: 4, units: [
    { id: "fm-u1", name: "Fluid Properties", topics: ["Density","Viscosity","Surface Tension","Capillarity","Compressibility"] },
    { id: "fm-u2", name: "Fluid Statics", topics: ["Pressure","Manometry","Buoyancy","Stability","Hydrostatic Forces"] },
    { id: "fm-u3", name: "Fluid Dynamics", topics: ["Continuity","Bernoulli","Euler","Navier-Stokes","Potential Flow"] },
    { id: "fm-u4", name: "Pipe Flow", topics: ["Laminar Flow","Turbulent Flow","Head Losses","Moody Chart","Pipe Networks"] },
    { id: "fm-u5", name: "Open Channel Flow", topics: ["Specific Energy","Hydraulic Jump","Manning Equation","Critical Flow","Weirs"] },
  ]},
  // CE subjects
  { id: "struc", name: "Structural Analysis", code: "CE301", semester: 4, branchIds: ["ce"], credits: 4, units: [
    { id: "str-u1", name: "Determinacy & Stability", topics: ["Static Indeterminacy","Kinematic Indeterminacy","Stability Conditions","Support Reactions","Free Body Diagrams"] },
    { id: "str-u2", name: "Energy Methods", topics: ["Virtual Work","Castigliano","Unit Load","Strain Energy","Maxwell Reciprocal"] },
    { id: "str-u3", name: "Slope Deflection", topics: ["Fixed End Moments","Slope Deflection Equation","Frames","Sway","Settlement"] },
    { id: "str-u4", name: "Moment Distribution", topics: ["Distribution Factors","Carry Over","Continuous Beams","Portal Frames","Symmetry"] },
    { id: "str-u5", name: "Matrix Methods", topics: ["Stiffness Method","Flexibility Method","Assembly","Band Width","Computer Implementation"] },
  ]},
  // Mechatronics
  { id: "robo", name: "Robotics & Automation", code: "MT501", semester: 5, branchIds: ["mech"], credits: 4, units: [
    { id: "robo-u1", name: "Robot Kinematics", topics: ["DH Parameters","Forward Kinematics","Inverse Kinematics","Workspace","Singularities"] },
    { id: "robo-u2", name: "Robot Dynamics", topics: ["Lagrange","Newton-Euler","Inertia Tensor","Trajectory Planning","Torque Computation"] },
    { id: "robo-u3", name: "Sensors & Actuators", topics: ["Encoders","Force Sensors","Servo Motors","Pneumatics","Hydraulics"] },
    { id: "robo-u4", name: "Control Systems", topics: ["PID Control","State Space","Adaptive Control","Fuzzy Logic","Neural Control"] },
    { id: "robo-u5", name: "Industrial Automation", topics: ["PLC","SCADA","CNC","FMS","Industry 4.0"] },
  ]},
  // Chemical
  { id: "masstrans", name: "Mass Transfer", code: "CHE401", semester: 5, branchIds: ["chem"], credits: 4, units: [
    { id: "mt-u1", name: "Diffusion", topics: ["Fick's Law","Steady State","Unsteady State","Equimolar Counter","Diffusion Coefficient"] },
    { id: "mt-u2", name: "Absorption", topics: ["Gas Absorption","Packed Columns","Plate Columns","HTU-NTU","Design"] },
    { id: "mt-u3", name: "Distillation", topics: ["VLE","McCabe-Thiele","Ponchon-Savarit","Multicomponent","Azeotropes"] },
    { id: "mt-u4", name: "Extraction", topics: ["Liquid-Liquid","Solid-Liquid","Leaching","Equipment","Supercritical"] },
    { id: "mt-u5", name: "Drying & Humidification", topics: ["Psychrometry","Drying Curves","Dryer Types","Humidification","Cooling Towers"] },
  ]},
];

export function getSubjectsForBranch(branchId: string, semester?: number): Subject[] {
  return SUBJECTS.filter(s => {
    const branchMatch = s.branchIds.includes(branchId);
    if (semester) return branchMatch && s.semester === semester;
    return branchMatch;
  });
}

export function getSubject(id: string): Subject | undefined {
  return SUBJECTS.find(s => s.id === id);
}
