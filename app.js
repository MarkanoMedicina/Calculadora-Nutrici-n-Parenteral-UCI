// ============================================================================
// CALCULADORA NUTRICIÓN PARENTERAL v3.0
// Autor: Dr. Edgard Marcano-Millán
// Hospital Universitario de Salamanca
// ============================================================================

let calculations = {};
let charts = {};

// ============================================================================
// UI RENDERING
// ============================================================================

function renderUI() {
    const content = `
        <!-- TAB: DATOS -->
        <div class="tab-content active" id="datos">
            ${renderDatosTab()}
        </div>

        <!-- TAB: CALCULADORAS -->
        <div class="tab-content" id="calculadoras">
            ${renderCalculadorasTab()}
        </div>

        <!-- TAB: DASHBOARD -->
        <div class="tab-content" id="dashboard">
            ${renderDashboardTab()}
        </div>

        <!-- TAB: CALCULOS -->
        <div class="tab-content" id="calculos">
            ${renderCalculosTab()}
        </div>

        <!-- TAB: PRESCRIPCION -->
        <div class="tab-content" id="prescripcion">
            ${renderPrescripcionTab()}
        </div>

        <!-- TAB: ALERTAS -->
        <div class="tab-content" id="alertas">
            <div id="alertasContainer"></div>
        </div>
    `;
    
    document.getElementById('appContent').innerHTML = content;
    attachEventListeners();
}

function renderDatosTab() {
    return `
        <div class="card">
            <div class="card-header"><span class="card-icon">👤</span>Datos del Paciente</div>
            
            <div class="form-group">
                <label class="form-label">ID Paciente</label>
                <input type="text" class="form-input" id="pacienteId" value="PAC001">
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Sexo</label>
                    <select class="form-select" id="sexo">
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Edad (años)</label>
                    <input type="number" class="form-input" id="edad" value="45">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Peso Real (kg)</label>
                    <input type="number" step="0.1" class="form-input" id="peso" value="70">
                </div>
                <div class="form-group">
                    <label class="form-label">Talla (m)</label>
                    <input type="number" step="0.01" class="form-input" id="talla" value="1.70">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Temperatura (°C)</label>
                    <input type="number" step="0.1" class="form-input" id="temperatura" value="37.5">
                </div>
                <div class="form-group">
                    <label class="form-label">Frec. Resp. (rpm)</label>
                    <input type="number" class="form-input" id="frecResp" value="16">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Fórmula Peso Ideal</label>
                <select class="form-select" id="formulaPeso">
                    <option value="Lorentz">Lorentz</option>
                    <option value="Devine">Devine</option>
                    <option value="Miller">Miller</option>
                    <option value="Robinson">Robinson</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Condición Clínica</label>
                <select class="form-select" id="condicion">
                    <option value="estable">Estable</option>
                    <option value="sepsis/trauma">Sepsis/Trauma</option>
                    <option value="quemado">Quemado</option>
                    <option value="insuficiencia renal">Insuficiencia Renal</option>
                    <option value="insuficiencia hepática">Insuficiencia Hepática</option>
                    <option value="obeso">Obeso</option>
                </select>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Propofol (ml/h)</label>
                    <input type="number" step="0.1" class="form-input" id="propofol" value="0">
                </div>
                <div class="form-group">
                    <label class="form-label">Fase Enfermedad</label>
                    <select class="form-select" id="fase">
                        <option value="aguda">Aguda (&lt;72h)</option>
                        <option value="post-aguda" selected>Post-aguda (≥72h)</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-icon">🩺</span>Datos Clínicos Avanzados
                <span class="badge badge-new">NUEVO</span>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">APACHE II (0-71)</label>
                    <input type="number" class="form-input" id="apacheII" value="15" min="0" max="71">
                </div>
                <div class="form-group">
                    <label class="form-label">SOFA (0-24)</label>
                    <input type="number" class="form-input" id="sofa" value="5" min="0" max="24">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Comorbilidades (n°)</label>
                    <input type="number" class="form-input" id="comorbilidades" value="1" min="0">
                </div>
                <div class="form-group">
                    <label class="form-label">Días Ingreso→UCI</label>
                    <input type="number" class="form-input" id="diasUCI" value="1" min="0">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">¿Diabético?</label>
                <select class="form-select" id="diabetico">
                    <option value="No">No</option>
                    <option value="Si">Sí</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Glucemia Actual (mg/dl)</label>
                <input type="number" class="form-input" id="glucemiaActual" value="120">
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-icon">💊</span>Medicaciones Especiales
                <span class="badge badge-farma">ALERTAS</span>
            </div>

            <div class="form-group">
                <label class="form-label">¿Clevidipino?</label>
                <select class="form-select" id="clevidipino">
                    <option value="No">No</option>
                    <option value="Si">Sí</option>
                </select>
            </div>

            <div class="form-group" id="clevidipinoDosisCont" style="display:none;">
                <label class="form-label">Dosis Clevidipino (mg/h)</label>
                <input type="number" step="0.1" class="form-input" id="dosisClevi" value="2">
            </div>

            <div class="form-group">
                <label class="form-label">¿Linezolid IV?</label>
                <select class="form-select" id="linezolid">
                    <option value="No">No</option>
                    <option value="Si">Sí</option>
                </select>
            </div>

            <div class="form-group" id="linezolidBoletaCont" style="display:none;">
                <label class="form-label">Bolsa Linezolid</label>
                <select class="form-select" id="boletaLinezolid">
                    <option value="300">300ml (15g glucosa)</option>
                    <option value="600">600ml (30g glucosa)</option>
                </select>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-icon">🔄</span>Terapia Reemplazo Renal
                <span class="badge badge-trr">TRR</span>
            </div>

            <div class="form-group">
                <label class="form-label">Tipo de TRR</label>
                <select class="form-select" id="tipoTRR">
                    <option value="ninguno">Ninguno</option>
                    <option value="HD">Hemodiálisis Intermitente</option>
                    <option value="CVVH">CVVH (Hemofiltración)</option>
                    <option value="CVVHD">CVVHD (Hemodiálisis)</option>
                    <option value="CVVHDF">CVVHDF (Hemodiafiltración)</option>
                </select>
            </div>

            <div class="form-group" id="dosisCRRTCont" style="display:none;">
                <label class="form-label">Dosis CRRT (ml/kg/h)</label>
                <input type="number" step="1" class="form-input" id="dosisCRRT" value="25">
            </div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-icon">🧬</span>Riesgo de Realimentación</div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">IMC &lt;18.5</label>
                    <select class="form-select" id="imcBajo">
                        <option value="No">No</option>
                        <option value="Sí">Sí</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Pérdida Peso &gt;10%</label>
                    <select class="form-select" id="perdidaPeso">
                        <option value="No">No</option>
                        <option value="Sí">Sí</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Ayuno &gt;7 días</label>
                <select class="form-select" id="ayuno">
                    <option value="No">No</option>
                    <option value="Sí">Sí</option>
                </select>
            </div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-icon">⚙️</span>Configuración Soluciones</div>

            <div class="form-group">
                <label class="form-label">Concentración Glucosa</label>
                <select class="form-select" id="concGlucosa">
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                    <option value="30" selected>30%</option>
                    <option value="33">33%</option>
                    <option value="50">50%</option>
                    <option value="70">70%</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Tipo Aminoácidos</label>
                <select class="form-select" id="tipoAA">
                    <option value="AA 15%" selected>AA 15%</option>
                    <option value="AA 10%">AA 10%</option>
                    <option value="AA 8.5%">AA 8.5%</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Emulsión Lipídica</label>
                <select class="form-select" id="tipoLipidos">
                    <option value="Intralipid 30%" selected>Intralipid 30%</option>
                    <option value="Clinoleic 20%">Clinoleic 20%</option>
                    <option value="SmofLipid 20%">SmofLipid 20%</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">% Calorías CHO (40-70%)</label>
                <input type="number" class="form-input" id="pctCHO" value="60" min="40" max="70">
            </div>
        </div>
    `;
}

function renderCalculadorasTab() {
    return `
        <div class="card">
            <div class="card-header">
                <span class="card-icon">💉</span>Calculadora de Insulina en PN
                <span class="badge badge-new">NUEVO</span>
            </div>
            <div id="insulinaPNContent"></div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-icon">🔄</span>Transición Insulina IV → SC
                <span class="badge badge-new">NUEVO</span>
            </div>
            
            <div class="form-group">
                <label class="form-label">Insulina IV últimas 24h (UI)</label>
                <input type="number" step="0.1" class="form-input" id="insulinaIV24h" value="0">
            </div>

            <div class="form-group">
                <label class="form-label">¿Paciente come?</label>
                <select class="form-select" id="pacienteCome">
                    <option value="si">Sí, dieta completa</option>
                    <option value="parcial">Parcial</option>
                    <option value="no">No (NPO)</option>
                </select>
            </div>

            <button class="btn btn-secondary" onclick="calcularTransicionInsulina()" style="margin-top:12px;">
                <span>🔄</span> Calcular Transición
            </button>

            <div id="transicionInsulinaContent"></div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-icon">🎯</span>NUTRIC Score
                <span class="badge badge-semicyuc">SCORE</span>
            </div>
            <div id="nutricScoreContent"></div>
        </div>
    `;
}

function renderDashboardTab() {
    return `
        <div class="stat-row" id="mainStats"></div>
        
        <div class="dashboard-grid">
            <div class="chart-card">
                <div class="chart-title">📊 Distribución Calórica</div>
                <div class="chart-container"><canvas id="chartCalorias"></canvas></div>
            </div>
            
            <div class="chart-card">
                <div class="chart-title">⚖️ Macronutrientes</div>
                <div class="chart-container"><canvas id="chartMacros"></canvas></div>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="chart-card">
                <div class="chart-title">💧 Volúmenes PN</div>
                <div class="chart-container"><canvas id="chartVolumenes"></canvas></div>
            </div>
            
            <div class="chart-card">
                <div class="chart-title">⚡ Electrolitos <span class="badge badge-semicyuc">SEMICYUC</span></div>
                <div class="chart-container"><canvas id="chartElectrolitos"></canvas></div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-icon">💧</span>Pérdidas Insensibles
            </div>
            <div id="perdidasInsensiblesContent"></div>
        </div>
    `;
}

function renderCalculosTab() {
    return `
        <div class="card">
            <div class="card-header"><span class="card-icon">📊</span>Antropometría</div>
            <div class="result-grid" id="antropometriaResults"></div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-icon">⚡</span>Requerimientos Energéticos</div>
            <div class="result-grid" id="energiaResults"></div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-icon">🥩</span>Requerimientos Proteicos</div>
            <div class="result-grid" id="proteinasResults"></div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-icon">🧪</span>Macronutrientes</div>
            <div class="result-grid" id="macrosResults"></div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-icon">⚡</span>Electrolitos Diarios
                <span class="badge badge-semicyuc">SEMICYUC</span>
            </div>
            <div class="result-grid" id="electrolitosResults"></div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-icon">💧</span>Volúmenes</div>
            <div class="result-grid" id="volumenesResults"></div>
        </div>
    `;
}

function renderPrescripcionTab() {
    return `
        <div class="stat-row" id="summaryStats"></div>

        <div class="card">
            <div class="card-header"><span class="card-icon">📋</span>Composición de la Mezcla</div>
            <table class="prescription-table" id="prescriptionTable"></table>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-icon">👁️</span>Monitorización Recomendada</div>
            <ul style="line-height: 1.8; padding-left: 20px; color: var(--text-secondary); font-size:13px;">
                <li>Glucemia capilar cada 4 horas</li>
                <li>Electrolitos séricos diarios (Na, K, Ca, Mg, P)</li>
                <li>Función hepática 2-3 veces por semana</li>
                <li>Triglicéridos si infusión lipídica</li>
                <li>Ajustar insulina si glucemia &gt; 150-180 mg/dl</li>
                <li>Balance hídrico diario</li>
                <li>En riesgo realimentación: fosfato 2-3 veces/día</li>
            </ul>
        </div>
    `;
}

// ============================================================================
// TAB MANAGEMENT
// ============================================================================

function setupTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tabName).classList.add('active');
            
            if (tabName === 'dashboard' && Object.keys(calculations).length > 0) {
                setTimeout(() => updateCharts(calculations), 100);
            }
        });
    });
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

function attachEventListeners() {
    const inputs = [
        'peso', 'talla', 'temperatura', 'frecResp', 'sexo', 'edad', 'formulaPeso',
        'condicion', 'propofol', 'fase', 'imcBajo', 'perdidaPeso', 'ayuno',
        'concGlucosa', 'tipoAA', 'tipoLipidos', 'pctCHO',
        'apacheII', 'sofa', 'comorbilidades', 'diasUCI', 'diabetico', 'glucemiaActual',
        'clevidipino', 'dosisClevi', 'linezolid', 'boletaLinezolid',
        'tipoTRR', 'dosisCRRT'
    ];

    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', () => {
                if (id === 'clevidipino') {
                    document.getElementById('clevidipinoDosisCont').style.display = 
                        element.value === 'Si' ? 'block' : 'none';
                }
                if (id === 'linezolid') {
                    document.getElementById('linezolidBoletaCont').style.display = 
                        element.value === 'Si' ? 'block' : 'none';
                }
                if (id === 'tipoTRR') {
                    const isCRRT = ['CVVH', 'CVVHD', 'CVVHDF'].includes(element.value);
                    document.getElementById('dosisCRRTCont').style.display = 
                        isCRRT ? 'block' : 'none';
                }
                setTimeout(calcular, 100);
            });
        }
    });
}

// ============================================================================
// CALCULATIONS
// ============================================================================

function calcular() {
    showLoading();
    
    setTimeout(() => {
        const data = getFormData();
        calculations = performCalculations(data);
        updateUI(calculations);
        updateCharts(calculations);
        hideLoading();
    }, 300);
}

function getFormData() {
    return {
        peso: parseFloat(document.getElementById('peso')?.value) || 70,
        talla: parseFloat(document.getElementById('talla')?.value) || 1.70,
        temperatura: parseFloat(document.getElementById('temperatura')?.value) || 37,
        frecResp: parseInt(document.getElementById('frecResp')?.value) || 16,
        sexo: document.getElementById('sexo')?.value || 'M',
        edad: parseInt(document.getElementById('edad')?.value) || 45,
        formulaPeso: document.getElementById('formulaPeso')?.value || 'Lorentz',
        condicion: document.getElementById('condicion')?.value || 'estable',
        propofol: parseFloat(document.getElementById('propofol')?.value) || 0,
        fase: document.getElementById('fase')?.value || 'post-aguda',
        imcBajo: document.getElementById('imcBajo')?.value || 'No',
        perdidaPeso: document.getElementById('perdidaPeso')?.value || 'No',
        ayuno: document.getElementById('ayuno')?.value || 'No',
        concGlucosa: parseFloat(document.getElementById('concGlucosa')?.value) || 30,
        tipoAA: document.getElementById('tipoAA')?.value || 'AA 15%',
        tipoLipidos: document.getElementById('tipoLipidos')?.value || 'Intralipid 30%',
        pctCHO: parseFloat(document.getElementById('pctCHO')?.value) || 60,
        apacheII: parseInt(document.getElementById('apacheII')?.value) || 15,
        sofa: parseInt(document.getElementById('sofa')?.value) || 5,
        comorbilidades: parseInt(document.getElementById('comorbilidades')?.value) || 1,
        diasUCI: parseInt(document.getElementById('diasUCI')?.value) || 1,
        diabetico: document.getElementById('diabetico')?.value || 'No',
        glucemiaActual: parseFloat(document.getElementById('glucemiaActual')?.value) || 120,
        clevidipino: document.getElementById('clevidipino')?.value || 'No',
        dosisClevi: parseFloat(document.getElementById('dosisClevi')?.value) || 2,
        linezolid: document.getElementById('linezolid')?.value || 'No',
        boletaLinezolid: document.getElementById('boletaLinezolid')?.value || '300',
        tipoTRR: document.getElementById('tipoTRR')?.value || 'ninguno',
        dosisCRRT: parseFloat(document.getElementById('dosisCRRT')?.value) || 25
    };
}

function performCalculations(data) {
    const calc = {};
    
    // Antropometría
    calc.alturaCm = data.talla * 100;
    calc.imc = data.peso / (data.talla * data.talla);
    
    const alturaInches = data.talla * 39.37;
    calc.pesoLorentz = 0.9 * calc.alturaCm - 100 - ((calc.alturaCm - 150) / 3.25);
    
    if (data.sexo === 'M') {
        calc.pesoDevine = 50 + 2.3 * (alturaInches - 60);
        calc.pesoMiller = 56.2 + 1.41 * (calc.alturaCm - 152.4);
        calc.pesoRobinson = 52 + 1.9 * (alturaInches - 60);
    } else {
        calc.pesoDevine = 45.5 + 2.3 * (alturaInches - 60);
        calc.pesoMiller = 53.1 + 1.36 * (calc.alturaCm - 152.4);
        calc.pesoRobinson = 49 + 1.7 * (alturaInches - 60);
    }
    
    calc.pesoIdeal = calc['peso' + data.formulaPeso] || calc.pesoLorentz;
    calc.pesoAjustado = calc.imc > 30 ? calc.pesoIdeal + 0.25 * (data.peso - calc.pesoIdeal) : data.peso;
    calc.pesoAplicable = calc.imc > 30 ? calc.pesoAjustado : data.peso;
    
    // DuBois (Superficie Corporal)
    calc.superficieCorporal = 0.007184 * Math.pow(data.peso, 0.425) * Math.pow(calc.alturaCm, 0.725);
    
    // Riesgo realimentación
    calc.riesgoRealimentacion = (calc.imc < 18.5 || data.perdidaPeso === 'Sí' || data.ayuno === 'Sí');
    
    // Energía
    if (data.fase === 'aguda') {
        calc.kcalKgBase = 22.5;
    } else if (calc.imc >= 30 && calc.imc <= 50) {
        calc.kcalKgBase = 12.5;
    } else if (calc.imc > 50) {
        calc.kcalKgBase = 23.5;
    } else {
        calc.kcalKgBase = 25;
    }
    
    calc.factorTemp = data.temperatura > 37 ? 1 + 0.12 * (data.temperatura - 37) : 1;
    calc.kcalKgAjustadas = calc.kcalKgBase * calc.factorTemp;
    calc.energiaTotal = calc.kcalKgAjustadas * calc.pesoAplicable;
    calc.caloriasPropofol = data.propofol * 24 * 1.1;
    calc.caloriasNutricionales = calc.energiaTotal - calc.caloriasPropofol;
    
    // Proteínas base
    if (data.condicion === 'sepsis/trauma') calc.proteinasKg = 1.8;
    else if (data.condicion === 'quemado') calc.proteinasKg = 2.25;
    else if (data.condicion === 'insuficiencia renal') calc.proteinasKg = 1.4;
    else if (data.condicion === 'insuficiencia hepática') calc.proteinasKg = 1.3;
    else if (calc.imc > 30) calc.proteinasKg = 2.25;
    else calc.proteinasKg = 1.6;
    
    // Ajuste por TRR
    if (data.tipoTRR === 'HD') {
        calc.proteinasKg += 0.2;
        calc.perdidasProteicasTRR = 12;
        calc.mensajeTRR = 'HD intermitente: +0.2 g/kg/día. Pérdida ~12g/sesión';
    } else if (['CVVH', 'CVVHD', 'CVVHDF'].includes(data.tipoTRR)) {
        calc.proteinasKg = Math.min(calc.proteinasKg + 0.5, 2.5);
        calc.perdidasProteicasTRR = 17;
        calc.mensajeTRR = `${data.tipoTRR}: Hasta 2.5 g/kg/día total. Pérdidas 15-20g/día`;
    }
    
    calc.pesoProteinas = calc.imc > 30 ? calc.pesoIdeal : calc.pesoAplicable;
    calc.proteinasTotal = calc.proteinasKg * calc.pesoProteinas;
    calc.nitrogeno = calc.proteinasTotal / 6.25;
    calc.caloriasProteicas = calc.proteinasTotal * 4;
    calc.caloriasNoProteicas = calc.caloriasNutricionales - calc.caloriasProteicas;
    calc.ratioNPCN = calc.nitrogeno > 0 ? calc.caloriasNoProteicas / calc.nitrogeno : 0;
    
    // Macronutrientes
    calc.pctLipidos = 100 - data.pctCHO;
    calc.kcalCHO = calc.caloriasNoProteicas * data.pctCHO / 100;
    calc.kcalLipidos = calc.caloriasNoProteicas * calc.pctLipidos / 100;
    
    calc.glucosaCalculada = calc.kcalCHO / 4;
    calc.glucosaMgKgMin = (calc.glucosaCalculada * 1000) / (calc.pesoAplicable * 1440);
    calc.glucosaFinal = calc.glucosaMgKgMin > 5 ? (5 * calc.pesoAplicable * 1440) / 1000 : calc.glucosaCalculada;
    
    // Ajuste por linezolid
    if (data.linezolid === 'Si') {
        const glucosaLinezolid = data.boletaLinezolid === '300' ? 15 : 30;
        calc.glucosaLinezolid = glucosaLinezolid;
        calc.glucosaFinal = Math.max(0, calc.glucosaFinal - glucosaLinezolid);
    }
    
    calc.lipidosCalculados = calc.kcalLipidos / 9;
    calc.lipidosGKg = calc.lipidosCalculados / calc.pesoAplicable;
    calc.lipidosFinal = calc.lipidosGKg > 1.5 ? 1.5 * calc.pesoAplicable : calc.lipidosCalculados;
    
    // Ajuste por clevidipino
    if (data.clevidipino === 'Si') {
        const kcalClevi = data.dosisClevi * 24 * 2;
        const gLipidosClevi = kcalClevi / 9;
        calc.kcalClevidipino = kcalClevi;
        calc.gLipidosClevidipino = gLipidosClevi;
        calc.lipidosFinal = Math.max(0, calc.lipidosFinal - gLipidosClevi);
    }
    
    // Insulina en PN
    calc.insulinaPNEstandar = calc.glucosaFinal / 20;
    calc.insulinaPNDiabetes = calc.glucosaFinal / 15;
    calc.insulinaPNAlternativo = calc.glucosaFinal * 0.1;
    calc.insulinaPNRecomendada = data.diabetico === 'Si' ? calc.insulinaPNDiabetes : calc.insulinaPNEstandar;
    
    // NUTRIC Score
    let nutricPuntos = 0;
    if (data.edad >= 75) nutricPuntos += 2;
    else if (data.edad >= 50) nutricPuntos += 1;
    
    if (data.apacheII >= 28) nutricPuntos += 3;
    else if (data.apacheII >= 20) nutricPuntos += 2;
    else if (data.apacheII >= 15) nutricPuntos += 1;
    
    if (data.sofa >= 10) nutricPuntos += 2;
    else if (data.sofa >= 6) nutricPuntos += 1;
    
    if (data.comorbilidades >= 2) nutricPuntos += 1;
    if (data.diasUCI >= 2) nutricPuntos += 1;
    
    calc.nutricScore = nutricPuntos;
    calc.nutricRiesgo = nutricPuntos >= 5 ? 'Alto' : 'Bajo';
    calc.nutricRecomendacion = nutricPuntos >= 5 ? 
        'Beneficio de NP agresiva con objetivo calórico 70-100%' : 
        'NP estándar, monitorizar tolerancia';
    
    // Electrolitos (SEMICYUC)
    calc.sodioRequerido = 1.5 * calc.pesoAplicable;
    calc.potasioRequerido = 1.5 * calc.pesoAplicable;
    calc.fosforoRequerido = Math.min(40, 0.5 * calc.pesoAplicable);
    calc.calcioRequerido = 12.5;
    calc.magnesioRequerido = 14;
    
    // Pérdidas insensibles
    calc.perdidasBasales = 0.5 * calc.pesoAplicable * 24;
    
    calc.perdidasFiebre = 0;
    if (data.temperatura >= 38 && data.temperatura < 39) calc.perdidasFiebre = 20 * 24;
    else if (data.temperatura >= 39 && data.temperatura < 40) calc.perdidasFiebre = 40 * 24;
    else if (data.temperatura >= 40) calc.perdidasFiebre = 60 * 24;
    
    calc.perdidasTaquipnea = 0;
    if (data.frecResp > 20) {
        calc.perdidasTaquipnea = Math.floor((data.frecResp - 20) / 5) * 4 * 24;
    }
    
    calc.perdidasInsensiblesTotal = calc.perdidasBasales + calc.perdidasFiebre + calc.perdidasTaquipnea;
    
    // Volúmenes
    calc.concAA = data.tipoAA === 'AA 15%' ? 150 : data.tipoAA === 'AA 10%' ? 100 : 85;
    calc.concLipidos = data.tipoLipidos === 'Intralipid 30%' ? 300 : 200;
    
    calc.volGlucosa = (calc.glucosaFinal * 1000) / (data.concGlucosa * 10);
    calc.volAA = (calc.proteinasTotal * 1000) / calc.concAA;
    calc.volLipidos = (calc.lipidosFinal * 1000) / calc.concLipidos;
    calc.volVitaminas = 10;
    calc.volOligos = 5;
    
    calc.volTotal = calc.volGlucosa + calc.volAA + calc.volLipidos + calc.volVitaminas + calc.volOligos;
    calc.velocidadInfusion = calc.volTotal / 24;
    
    // Alertas
    calc.alertas = [];
    
    if (calc.riesgoRealimentacion) {
        calc.alertas.push({
            type: 'danger',
            message: 'RIESGO DE REALIMENTACIÓN (SEMICYUC): Iniciar con 10-15 kcal/kg/día. Monitorizar fosfato 2-3 veces al día los primeros 3-5 días.'
        });
    }
    
    if (calc.glucosaMgKgMin > 5) {
        calc.alertas.push({
            type: 'warning',
            message: `Infusión de glucosa EXCEDE 5 mg/kg/min (actual: ${calc.glucosaMgKgMin.toFixed(1)}). Ajustado automáticamente.`
        });
    }
    
    if (calc.lipidosGKg > 1.5) {
        calc.alertas.push({
            type: 'warning',
            message: `Infusión de lípidos EXCEDE 1.5 g/kg/día (actual: ${calc.lipidosGKg.toFixed(1)}). Ajustado automáticamente.`
        });
    }
    
    if (data.clevidipino === 'Si') {
        calc.alertas.push({
            type: 'info',
            message: `⚠️ CLEVIDIPINO DETECTADO: Contiene 2 kcal/ml (20% lípidos). A ${data.dosisClevi} mg/h = ${calc.kcalClevidipino.toFixed(0)} kcal/día (${calc.gLipidosClevidipino.toFixed(1)}g lípidos). Ajustada emulsión lipídica en PN.`
        });
    }
    
    if (data.linezolid === 'Si') {
        calc.alertas.push({
            type: 'info',
            message: `⚠️ LINEZOLID DETECTADO: Bolsa ${data.boletaLinezolid}ml aporta ${calc.glucosaLinezolid}g glucosa adicional. Ajustada glucosa en PN.`
        });
    }
    
    if (data.tipoTRR !== 'ninguno') {
        calc.alertas.push({
            type: 'info',
            message: `🔄 TRR ACTIVO: ${calc.mensajeTRR}. Proteínas ajustadas a ${calc.proteinasKg.toFixed(1)} g/kg/día.`
        });
    }
    
    if (calc.nutricScore >= 5) {
        calc.alertas.push({
            type: 'warning',
            message: `🎯 NUTRIC Score ${calc.nutricScore}/9 (ALTO RIESGO). ${calc.nutricRecomendacion}`
        });
    }
    
    if (data.temperatura >= 38) {
        calc.alertas.push({
            type: 'warning',
            message: `Fiebre detectada (${data.temperatura}°C). Pérdidas insensibles aumentadas en ${calc.perdidasFiebre.toFixed(0)} ml/día.`
        });
    }
    
    if (data.frecResp > 20) {
        calc.alertas.push({
            type: 'warning',
            message: `Taquipnea detectada (${data.frecResp} rpm). Pérdidas insensibles aumentadas en ${calc.perdidasTaquipnea.toFixed(0)} ml/día.`
        });
    }
    
    if (calc.alertas.length === 0) {
        calc.alertas.push({
            type: 'success',
            message: 'Todos los parámetros dentro de rangos seguros según guías ESPEN/ASPEN/SEMICYUC.'
        });
    }
    
    return calc;
}

// ============================================================================
// UI UPDATES
// ============================================================================

function updateUI(calc) {
    // Main stats
    const mainStatsHTML = `
        <div class="stat-box">
            <div class="stat-value">${calc.energiaTotal.toFixed(0)}</div>
            <div class="stat-label">Energía Total</div>
            <div class="stat-sublabel">kcal/día</div>
        </div>
        <div class="stat-box">
            <div class="stat-value">${calc.proteinasTotal.toFixed(0)}</div>
            <div class="stat-label">Proteínas</div>
            <div class="stat-sublabel">g/día (${calc.proteinasKg.toFixed(1)} g/kg)</div>
        </div>
        <div class="stat-box">
            <div class="stat-value">${calc.volTotal.toFixed(0)}</div>
            <div class="stat-label">Volumen PN</div>
            <div class="stat-sublabel">ml/día</div>
        </div>
        <div class="stat-box">
            <div class="stat-value">${calc.velocidadInfusion.toFixed(1)}</div>
            <div class="stat-label">Velocidad</div>
            <div class="stat-sublabel">ml/h</div>
        </div>
    `;
    const mainStatsEl = document.getElementById('mainStats');
    if (mainStatsEl) mainStatsEl.innerHTML = mainStatsHTML;
    
    // Insulina PN
    const insulinaPNHTML = `
        <div class="calculator-result">
            <strong>Protocolo No Diabético:</strong> ${calc.insulinaPNEstandar.toFixed(1)} UI (1 UI / 20g dextrosa)<br>
            <strong>Protocolo Diabético:</strong> ${calc.insulinaPNDiabetes.toFixed(1)} UI (1 UI / 15g dextrosa)<br>
            <strong>Protocolo Alternativo:</strong> ${calc.insulinaPNAlternativo.toFixed(1)} UI (0.1 UI / g dextrosa)<br><br>
            <strong style="color:var(--primary);">RECOMENDADO: ${calc.insulinaPNRecomendada.toFixed(1)} UI de insulina regular</strong>
        </div>
        <div class="alert alert-info" style="margin-top:12px;">
            <div class="alert-icon">💉</div>
            <div><strong>IMPORTANTE:</strong> Solo insulina regular/corriente es compatible con PN. Añadir directamente a la bolsa.</div>
        </div>
    `;
    const insulinaPNEl = document.getElementById('insulinaPNContent');
    if (insulinaPNEl) insulinaPNEl.innerHTML = insulinaPNHTML;
    
    // NUTRIC Score
    const nutricHTML = `
        <div style="display:flex; align-items:center; margin:20px 0;">
            <div class="score-badge ${calc.nutricRiesgo === 'Alto' ? 'score-alto' : 'score-bajo'}">${calc.nutricScore}</div>
            <div>
                <div style="font-size:18px; font-weight:700; color:var(--primary);">
                    Riesgo ${calc.nutricRiesgo}
                    <span class="badge ${calc.nutricRiesgo === 'Alto' ? 'badge-nutric-alto' : 'badge-nutric-bajo'}">
                        ${calc.nutricScore}/9
                    </span>
                </div>
                <div style="font-size:13px; color:var(--text-secondary); margin-top:4px;">
                    ${calc.nutricRecomendacion}
                </div>
            </div>
        </div>
        <div style="font-size:12px; color:var(--text-secondary); line-height:1.6;">
            <strong>Desglose:</strong> Edad (${calc.nutricScore >= 2 ? '2' : calc.nutricScore >= 1 ? '1' : '0'}), 
            APACHE II (${Math.min(3, Math.floor(calc.nutricScore/2))}), 
            SOFA, Comorbilidades, Días UCI
        </div>
    `;
    const nutricEl = document.getElementById('nutricScoreContent');
    if (nutricEl) nutricEl.innerHTML = nutricHTML;
    
    // Pérdidas insensibles
    const perdidasHTML = `
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Pérdidas Basales (0.5 ml/kg/h)</span>
                <span class="result-value">${calc.perdidasBasales.toFixed(0)}<span class="result-unit">ml/día</span></span>
            </div>
            ${calc.perdidasFiebre > 0 ? `
            <div class="result-item">
                <span class="result-label">Ajuste por Fiebre</span>
                <span class="result-value">${calc.perdidasFiebre.toFixed(0)}<span class="result-unit">ml/día</span></span>
            </div>` : ''}
            ${calc.perdidasTaquipnea > 0 ? `
            <div class="result-item">
                <span class="result-label">Ajuste por Taquipnea</span>
                <span class="result-value">${calc.perdidasTaquipnea.toFixed(0)}<span class="result-unit">ml/día</span></span>
            </div>` : ''}
            <div class="result-item" style="border-left-color: var(--accent);">
                <span class="result-label"><strong>TOTAL Pérdidas Insensibles</strong></span>
                <span class="result-value">${calc.perdidasInsensiblesTotal.toFixed(0)}<span class="result-unit">ml/día</span></span>
            </div>
        </div>
    `;
    const perdidasEl = document.getElementById('perdidasInsensiblesContent');
    if (perdidasEl) perdidasEl.innerHTML = perdidasHTML;
    
    // Antropometría
    updateResultSection('antropometriaResults', [
        { label: 'IMC', value: calc.imc.toFixed(2), unit: 'kg/m²' },
        { label: 'Peso Ideal', value: calc.pesoIdeal.toFixed(1), unit: 'kg' },
        { label: 'Peso Aplicable', value: calc.pesoAplicable.toFixed(1), unit: 'kg' },
        { label: 'Sup. Corporal (DuBois)', value: calc.superficieCorporal.toFixed(2), unit: 'm²' }
    ]);
    
    // Energía
    updateResultSection('energiaResults', [
        { label: 'Kcal/kg/día', value: calc.kcalKgAjustadas.toFixed(1), unit: 'kcal/kg' },
        { label: 'Energía Total', value: calc.energiaTotal.toFixed(0), unit: 'kcal/día' },
        { label: 'Cal. Propofol', value: calc.caloriasPropofol.toFixed(0), unit: 'kcal/día' },
        { label: 'Cal. Nutricionales', value: calc.caloriasNutricionales.toFixed(0), unit: 'kcal/día' }
    ]);
    
    // Proteínas
    updateResultSection('proteinasResults', [
        { label: 'Proteínas', value: calc.proteinasTotal.toFixed(0), unit: 'g/día' },
        { label: 'Proteínas/kg', value: calc.proteinasKg.toFixed(1), unit: 'g/kg/día' },
        { label: 'Nitrógeno', value: calc.nitrogeno.toFixed(1), unit: 'g/día' },
        { label: 'Ratio NPC:N', value: calc.ratioNPCN.toFixed(0), unit: '' }
    ]);
    
    // Macros
    updateResultSection('macrosResults', [
        { label: 'Glucosa', value: calc.glucosaFinal.toFixed(0), unit: 'g/día' },
        { label: 'Glucosa', value: calc.glucosaMgKgMin.toFixed(1), unit: 'mg/kg/min' },
        { label: 'Lípidos', value: calc.lipidosFinal.toFixed(0), unit: 'g/día' },
        { label: 'Lípidos/kg', value: calc.lipidosGKg.toFixed(1), unit: 'g/kg/día' }
    ]);
    
    // Electrolitos
    updateResultSection('electrolitosResults', [
        { label: 'Sodio', value: calc.sodioRequerido.toFixed(0), unit: 'mEq/día' },
        { label: 'Potasio', value: calc.potasioRequerido.toFixed(0), unit: 'mEq/día' },
        { label: 'Fósforo', value: calc.fosforoRequerido.toFixed(0), unit: 'mmol/día' },
        { label: 'Calcio', value: calc.calcioRequerido.toFixed(1), unit: 'mEq/día' },
        { label: 'Magnesio', value: calc.magnesioRequerido.toFixed(0), unit: 'mEq/día' }
    ]);
    
    // Volúmenes
    updateResultSection('volumenesResults', [
        { label: 'Vol. Glucosa', value: calc.volGlucosa.toFixed(0), unit: 'ml' },
        { label: 'Vol. Aminoácidos', value: calc.volAA.toFixed(0), unit: 'ml' },
        { label: 'Vol. Lípidos', value: calc.volLipidos.toFixed(0), unit: 'ml' },
        { label: 'Vol. Total PN', value: calc.volTotal.toFixed(0), unit: 'ml' },
        { label: 'Velocidad', value: calc.velocidadInfusion.toFixed(1), unit: 'ml/h' }
    ]);
    
    // Summary stats
    const summaryHTML = mainStatsHTML;
    const summaryEl = document.getElementById('summaryStats');
    if (summaryEl) summaryEl.innerHTML = summaryHTML;
    
    // Prescription table
    const data = getFormData();
    const tableHTML = `
        <thead>
            <tr>
                <th>Componente</th>
                <th>Solución</th>
                <th>Cantidad</th>
                <th>Volumen (ml)</th>
                <th>Velocidad (ml/h)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Aminoácidos</strong></td>
                <td>${data.tipoAA}</td>
                <td class="numeric">${calc.proteinasTotal.toFixed(0)} g</td>
                <td class="numeric">${calc.volAA.toFixed(0)}</td>
                <td class="numeric">${(calc.volAA/24).toFixed(1)}</td>
            </tr>
            <tr>
                <td><strong>Glucosa</strong></td>
                <td>${data.concGlucosa}%</td>
                <td class="numeric">${calc.glucosaFinal.toFixed(0)} g</td>
                <td class="numeric">${calc.volGlucosa.toFixed(0)}</td>
                <td class="numeric">${(calc.volGlucosa/24).toFixed(1)}</td>
            </tr>
            <tr>
                <td><strong>Lípidos</strong></td>
                <td>${data.tipoLipidos}</td>
                <td class="numeric">${calc.lipidosFinal.toFixed(0)} g</td>
                <td class="numeric">${calc.volLipidos.toFixed(0)}</td>
                <td class="numeric">${(calc.volLipidos/24).toFixed(1)}</td>
            </tr>
            <tr>
                <td><strong>Multivitamínicos</strong></td>
                <td>MVI</td>
                <td>—</td>
                <td class="numeric">${calc.volVitaminas}</td>
                <td class="numeric">${(calc.volVitaminas/24).toFixed(1)}</td>
            </tr>
            <tr>
                <td><strong>Oligoelementos</strong></td>
                <td>Oligoelementos</td>
                <td>—</td>
                <td class="numeric">${calc.volOligos}</td>
                <td class="numeric">${(calc.volOligos/24).toFixed(1)}</td>
            </tr>
            ${data.diabetico === 'Si' || calc.insulinaPNRecomendada > 0 ? `
            <tr>
                <td><strong>Insulina Regular</strong></td>
                <td>Recomendada</td>
                <td class="numeric">${calc.insulinaPNRecomendada.toFixed(1)} UI</td>
                <td>—</td>
                <td>—</td>
            </tr>
            ` : ''}
            <tr style="background: #f0f7ff; font-weight: 700;">
                <td colspan="3"><strong>TOTAL</strong></td>
                <td class="numeric">${calc.volTotal.toFixed(0)}</td>
                <td class="numeric">${calc.velocidadInfusion.toFixed(1)}</td>
            </tr>
        </tbody>
    `;
    const tableEl = document.getElementById('prescriptionTable');
    if (tableEl) tableEl.innerHTML = tableHTML;
    
    // Alertas
    const alertasHTML = calc.alertas.map(alert => `
        <div class="alert alert-${alert.type}">
            <div class="alert-icon">${alert.type === 'danger' ? '⚠️' : alert.type === 'warning' ? '⚡' : alert.type === 'info' ? 'ℹ️' : '✅'}</div>
            <div>${alert.message}</div>
        </div>
    `).join('');
    const alertasEl = document.getElementById('alertasContainer');
    if (alertasEl) alertasEl.innerHTML = alertasHTML;
}

function updateResultSection(elementId, items) {
    const html = items.map(item => `
        <div class="result-item">
            <span class="result-label">${item.label}</span>
            <span class="result-value">${item.value}<span class="result-unit">${item.unit}</span></span>
        </div>
    `).join('');
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = html;
}

// ============================================================================
// CALCULADORA TRANSICIÓN INSULINA
// ============================================================================

function calcularTransicionInsulina() {
    const insulinaIV24h = parseFloat(document.getElementById('insulinaIV24h')?.value) || 0;
    const pacienteCome = document.getElementById('pacienteCome')?.value || 'si';
    
    if (insulinaIV24h === 0) {
        document.getElementById('transicionInsulinaContent').innerHTML = `
            <div class="alert alert-warning" style="margin-top:12px;">
                <div class="alert-icon">⚠️</div>
                <div>Por favor ingresa la dosis de insulina IV de las últimas 24 horas.</div>
            </div>
        `;
        return;
    }
    
    const RTD = insulinaIV24h;
    const basal = RTD * 0.5;
    const prandialTotal = pacienteCome !== 'no' ? RTD * 0.5 : 0;
    const prandialPorToma = prandialTotal / 3;
    
    const factorCome = pacienteCome === 'parcial' ? 0.7 : 1.0;
    const prandialAjustado = prandialPorToma * factorCome;
    
    const html = `
        <div class="calculator-result">
            <strong>RTD (Req. Total Diario):</strong> ${RTD.toFixed(1)} UI/día<br><br>
            
            <strong style="color:var(--primary);">INSULINA BASAL (Glargina/Detemir):</strong><br>
            ${basal.toFixed(1)} UI/día (50% del RTD)<br><br>
            
            ${pacienteCome !== 'no' ? `
            <strong style="color:var(--primary);">INSULINA PRANDIAL (Rápida):</strong><br>
            • Desayuno: ${prandialAjustado.toFixed(1)} UI<br>
            • Comida: ${prandialAjustado.toFixed(1)} UI<br>
            • Cena: ${prandialAjustado.toFixed(1)} UI<br>
            Total prandial: ${(prandialAjustado * 3).toFixed(1)} UI/día
            ${pacienteCome === 'parcial' ? '<br><small>(Ajustado 70% por ingesta parcial)</small>' : ''}
            ` : `
            <strong>INSULINA PRANDIAL:</strong> No aplica (paciente NPO)<br>
            Considerar solo basal + corrección según glucemias
            `}
        </div>
        <div class="alert alert-info" style="margin-top:12px;">
            <div class="alert-icon">🔄</div>
            <div><strong>REGLA DEL 50:</strong> 50% basal + 50% prandial. Monitorizar glucemias y ajustar según respuesta.</div>
        </div>
    `;
    
    document.getElementById('transicionInsulinaContent').innerHTML = html;
}

// ============================================================================
// CHARTS
// ============================================================================

function updateCharts(calc) {
    // Chart 1: Distribución Calórica
    const ctx1 = document.getElementById('chartCalorias');
    if (!ctx1) return;
    
    if (charts.calorias) charts.calorias.destroy();
    charts.calorias = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Proteínas', 'Carbohidratos', 'Lípidos', 'Propofol'],
            datasets: [{
                data: [calc.caloriasProteicas, calc.kcalCHO, calc.kcalLipidos, calc.caloriasPropofol],
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#95E1D3'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { font: { family: "'Outfit', sans-serif", size: 10 }, padding: 10 } },
                tooltip: { callbacks: { label: ctx => ctx.label + ': ' + ctx.parsed.toFixed(0) + ' kcal' } }
            }
        }
    });
    
    // Chart 2: Macronutrientes
    const ctx2 = document.getElementById('chartMacros');
    if (ctx2) {
        if (charts.macros) charts.macros.destroy();
        charts.macros = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Proteínas', 'CHO', 'Lípidos'],
                datasets: [{
                    label: 'g/día',
                    data: [calc.proteinasTotal, calc.glucosaFinal, calc.lipidosFinal],
                    backgroundColor: ['rgba(255, 107, 107, 0.8)', 'rgba(78, 205, 196, 0.8)', 'rgba(255, 217, 61, 0.8)'],
                    borderColor: ['#FF6B6B', '#4ECDC4', '#FFD93D'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { font: { family: "'JetBrains Mono', monospace", size: 9 } } },
                    x: { ticks: { font: { family: "'Outfit', sans-serif", size: 10 } } }
                }
            }
        });
    }
    
    // Chart 3: Volúmenes
    const ctx3 = document.getElementById('chartVolumenes');
    if (ctx3) {
        if (charts.volumenes) charts.volumenes.destroy();
        charts.volumenes = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['AA', 'Glucosa', 'Lípidos', 'Otros'],
                datasets: [{
                    label: 'ml',
                    data: [calc.volAA, calc.volGlucosa, calc.volLipidos, calc.volVitaminas + calc.volOligos],
                    backgroundColor: 'rgba(10, 77, 104, 0.8)',
                    borderColor: '#0A4D68',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true },
                    x: { ticks: { font: { size: 10 } } }
                }
            }
        });
    }
    
    // Chart 4: Electrolitos Radar
    const ctx4 = document.getElementById('chartElectrolitos');
    if (ctx4) {
        if (charts.electrolitos) charts.electrolitos.destroy();
        charts.electrolitos = new Chart(ctx4, {
            type: 'radar',
            data: {
                labels: ['Na (mEq)', 'K (mEq)', 'P (mmol)', 'Ca (mEq)', 'Mg (mEq)'],
                datasets: [{
                    label: 'Req.',
                    data: [calc.sodioRequerido, calc.potasioRequerido, calc.fosforoRequerido, calc.calcioRequerido, calc.magnesioRequerido],
                    backgroundColor: 'rgba(5, 195, 221, 0.2)',
                    borderColor: '#05C3DD',
                    borderWidth: 2,
                    pointBackgroundColor: '#05C3DD'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        beginAtZero: true,
                        ticks: { font: { size: 8 } },
                        pointLabels: { font: { size: 9 } }
                    }
                }
            }
        });
    }
}

// ============================================================================
// UTILITIES
// ============================================================================

function showLoading() {
    document.getElementById('loadingOverlay').classList.add('active');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('active');
}

function saveState() {
    const state = {
        calculations,
        formData: getFormData(),
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('npCalculatorState', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('npCalculatorState');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            Object.keys(state.formData).forEach(key => {
                const element = document.getElementById(key);
                if (element) element.value = state.formData[key];
            });
        } catch (e) {
            console.error('Error loading state:', e);
        }
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    renderUI();
    setupTabs();
    
    // Auto-save
    setInterval(saveState, 30000);
    
    // Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
    
    // Initial calculation
    calcular();
    
    // Calculate button
    document.getElementById('calcularBtn').addEventListener('click', calcular);
});
