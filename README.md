# Calculadora-Nutrici-n-Parenteral-UCI
---
# 💉 Calculadora de Nutrición Parenteral v3.0

**Aplicación web progresiva (PWA) profesional para el cálculo de prescripciones de nutrición parenteral**

---

## 👨‍⚕️ Autoría

**Desarrollado por:** Dr. Edgard Marcano-Millán  
**Institución:** Hospital Universitario de Salamanca - UCI  
**Versión:** 3.0 (Febrero 2026)  
**Guías implementadas:** ESPEN 2023, ASPEN 2019, SEMICYUC 2020

---

## 🚀 Características v3.0

### ✨ Funcionalidades Principales

#### 1. **Cálculo Completo de Nutrición Parenteral**
- Antropometría avanzada (4 fórmulas de peso ideal)
- Requerimientos energéticos ajustados por fase y temperatura
- Requerimientos proteicos específicos por condición clínica
- Distribución de macronutrientes con límites de seguridad
- Cálculo automático de volúmenes y velocidades de infusión

#### 2. **Electrolitos Diarios (SEMICYUC)** 📊
- **Sodio**: 1.5 mEq/kg/día
- **Potasio**: 1.5 mEq/kg/día  
- **Fósforo**: 0.5 mmol/kg/día (máx 40 mmol)
- **Calcio**: 12.5 mEq/día
- **Magnesio**: 14 mEq/día

#### 3. **Pérdidas Insensibles de Agua** 💧
- **Basales**: 0.5 ml/kg/h × 24h
- **Ajustes por fiebre**:
  - 38-39°C: +480 ml/día
  - 39-40°C: +960 ml/día
  - ≥40°C: +1440 ml/día
- **Ajustes por taquipnea**: +4 ml/h × 24h por cada 5 rpm >20

#### 4. **Calculadora de Insulina** 💉
**A. Insulina en Nutrición Parenteral:**
- Protocolo no diabético: 1 UI / 20g dextrosa
- Protocolo diabético: 1 UI / 15g dextrosa
- Protocolo alternativo: 0.1 UI/g dextrosa

**B. Transición Insulina IV → Subcutánea (Regla del 50):**
- RTD = Insulina IV últimas 24h
- 50% basal (glargina/detemir)
- 50% prandial (3 tomas)

#### 5. **NUTRIC Score (Modificado sin IL-6)** 🎯
Variables:
- Edad (0-2 puntos)
- APACHE II (0-3 puntos)
- SOFA (0-2 puntos)
- Comorbilidades (0-1 punto)
- Días ingreso→UCI (0-1 punto)

**Interpretación:**
- 0-4 puntos: Bajo riesgo nutricional
- 5-9 puntos: Alto riesgo → NP agresiva recomendada

#### 6. **Superficie Corporal (DuBois)** 📏
## 🔬 Fundamento Científico

### Guías Implementadas

**ESPEN 2023** - European Society for Clinical Nutrition and Metabolism
- Requerimientos energéticos
- Límites de infusión de glucosa (≤5 mg/kg/min)
- Límites de infusión lipídica (≤1.5 g/kg/día)

**ASPEN 2019** - American Society for Parenteral and Enteral Nutrition
- Distribución de macronutrientes
- Ratio NPC:N óptimo (100-150)
- Monitorización glucémica

**SEMICYUC 2020** - Sociedad Española de Medicina Intensiva
- Aporte proteico por condición clínica
- Rango energético 20-30 kcal/kg/día
- Electrolitos diarios
- Protocolo síndrome de realimentación

### Referencias Bibliográficas

1. Singer P, et al. ESPEN guideline on clinical nutrition in the intensive care unit. Clin Nutr. 2023.
2. McClave SA, et al. Guidelines for the Provision and Assessment of Nutrition Support Therapy in the Adult Critically Ill Patient: Society of Critical Care Medicine (SCCM) and American Society for Parenteral and Enteral Nutrition (A.S.P.E.N.). JPEN. 2019.
3. Grupo de Trabajo de Metabolismo y Nutrición SEMICYUC. Recomendaciones para el tratamiento nutrometabólico especializado del paciente crítico. Med Intensiva. 2020.
4. Heyland DK, et al. Identifying critically ill patients who benefit the most from nutrition therapy: the development and initial validation of a novel risk assessment tool. Crit Care. 2011.
5. Olveira G, et al. INSUPAR Trial. Regular insulin added to total parenteral nutrition vs subcutaneous glargine in non-critically ill diabetic inpatients. Clin Nutr. 2019.
#### 7. **Alertas Farmacológicas** ⚠️
**Clevidipino:**
- Contiene 2 kcal/ml (20% lípidos)
- Ajuste automático de emulsión lipídica

**Linezolid:**
- Bolsa 300ml = 15g glucosa
- Bolsa 600ml = 30g glucosa
- Ajuste automático de glucosa en PN

#### 8. **Ajustes por TRR (Técnicas Reemplazo Renal)** 🔄
**Hemodiálisis Intermitente:**
- +0.2 g/kg/día proteínas
- Pérdida ~12g/sesión

**Terapias Continuas (CRRT):**
- Hasta 2.5 g/kg/día total
- CVVH/CVVHD/CVVHDF: Pérdidas 15-20g/día

#### 9. **Dashboard Interactivo** 📊
- 4 gráficos profesionales con Chart.js:
  - Distribución calórica (dona)
  - Macronutrientes (barras)
  - Volúmenes PN (barras)
  - Electrolitos (radar)

---

## 📱 Instalación

### Método 1: PWA en iPhone/iPad
1. Abre Safari y navega a la URL de la app
2. Toca el botón "Compartir" (cuadrado con flecha)
3. Selecciona "Añadir a pantalla de inicio"
4. ¡Listo! Funciona offline

### Método 2: PWA en Android
1. Abre Chrome y navega a la URL
2. Toca el menú (⋮)
3. Selecciona "Instalar app" o "Añadir a pantalla de inicio"

### Método 3: Uso local
```bash
# Descarga los archivos
# Abre index.html en tu navegador
# O inicia un servidor local:
python -m http.server 8000
# Abre http://localhost:8000
```

---

## 🎯 Casos de Uso

### Intensivista
- Prescripción completa de PN en 5 minutos
- Detección automática de interacciones farmacológicas
- Estratificación de riesgo nutricional

### Residente
- Aprendizaje de protocolos estandarizados
- Comprensión de cálculos nutricionales
- Práctica con casos clínicos

### Farmacéutico
- Validación de compatibilidades
- Verificación de dosis de insulina
- Control de aportes calóricos/proteicos

### Nutricionista Clínico
- Estratificación NUTRIC Score
- Cálculo preciso de electrolitos
- Monitorización de pérdidas insensibles

---

## 📋 Estructura de la Aplicación
---

## ⚙️ Especificaciones Técnicas

**Frontend:**
- HTML5 + CSS3 (CSS Grid, Flexbox)
- JavaScript ES6+ (Vanilla)
- Chart.js 4.4.0

**Diseño:**
- Mobile-first responsive
- PWA con Service Worker
- Offline-capable
- Tipografía: Outfit + JetBrains Mono
- Paleta: Azul marino (#0A4D68) + Turquesa (#05C3DD)

**Funcionalidades:**
- LocalStorage para persistencia
- Cálculos en tiempo real
- Validación de inputs
- Exportable (futuro)

---

## 🛡️ Limitaciones y Disclaimer

⚠️ **IMPORTANTE:**
- Esta herramienta es de apoyo a la decisión clínica
- No sustituye el juicio clínico del profesional
- Los resultados deben ser validados por médico tratante
- Ajustar según parámetros analíticos del paciente
- Monitorizar estrechamente durante administración

---

## 📞 Contacto y Soporte

**Autor:** Dr. Edgard Marcano-Millán  
**Email:** Disponible a través del Hospital Universitario de Salamanca  
**Departamento:** UCI - Unidad de Cuidados Intensivos  

Para reportar errores, sugerencias o solicitar nuevas funcionalidades, contactar a través de los canales oficiales del hospital.

---

## 📄 Licencia

**Uso académico y clínico**  
© 2026 Dr. Edgard Marcano-Millán - Hospital Universitario de Salamanca

Esta herramienta ha sido desarrollada con fines educativos y de mejora de la práctica clínica. El uso comercial requiere autorización expresa del autor.

---

## 🎓 Historial de Versiones

### v3.0 (Febrero 2026) - ACTUAL
- ✅ Calculadora de insulina (PN + transición IV→SC)
- ✅ NUTRIC Score modificado
- ✅ Superficie corporal DuBois
- ✅ Alertas farmacológicas (Clevidipino/Linezolid)
- ✅ Ajustes por TRR (HD + CRRT)
- ✅ Datos clínicos avanzados (APACHE II, SOFA)
- ✅ Atribución profesional en UI

### v2.0 (Febrero 2026)
- ✅ Dashboard con gráficos Chart.js
- ✅ Electrolitos diarios SEMICYUC
- ✅ Pérdidas insensibles completas
- ✅ PWA funcional

### v1.0 (Febrero 2026)
- ✅ Cálculos básicos de PN
- ✅ Múltiples fórmulas peso ideal
- ✅ Riesgo de realimentación
- ✅ Versión Excel

---

## 🙏 Agradecimientos

Agradecimiento especial al equipo de la UCI del Hospital Universitario de Salamanca por su retroalimentación continua y validación clínica de los cálculos implementados.

---

**Última actualización:** Febrero 2026  
**Versión:** 3.0.0  
**Estado:** Producción ✅
