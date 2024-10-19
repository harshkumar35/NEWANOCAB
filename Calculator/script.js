function calculateCableSize() {
    let phase = document.getElementById('phase').value;
    let cableLength = document.getElementById('cableLength').value;
    let lengthUnit = document.getElementById('lengthUnit').value;
    let material = document.getElementById('material').value;
    let motorPower = document.getElementById('motorPower').value;
    let powerUnit = document.getElementById('powerUnit').value;

    if (!phase || !cableLength || !material || !motorPower || !powerUnit) {
        alert('Please fill out all the fields.');
        return;
    }

    let fullLoadCurrent;
    let voltage;

    // Set voltage based on phase selection
    if (phase === 'single') {
        voltage = 230;
    } else {
        voltage = 430;
    }

    // Convert motor power based on selected unit
    if (powerUnit === 'kw') {
        fullLoadCurrent = (motorPower * 1000) / (phase === 'three' ? (1.732 * voltage) : voltage);
    } else if (powerUnit === 'hp') {
        motorPower = motorPower * 0.7457; // Convert HP to kW
        fullLoadCurrent = (motorPower * 1000) / (phase === 'three' ? (1.732 * voltage) : voltage);
    } else if (powerUnit === 'watt') {
        fullLoadCurrent = motorPower / (phase === 'three' ? (1.732 * voltage) : voltage);
    }

    // Adjust for cable material (copper or aluminum)
    if (material === 'copper') {
        fullLoadCurrent *= 1; // Copper has higher conductivity
    } else if (material === 'aluminum') {
        fullLoadCurrent *= 1.5; // Aluminum has lower conductivity
    }

    // Adjust length unit (meters or feet)
    if (lengthUnit === 'feet') {
        cableLength = cableLength * 0.3048; // Convert feet to meters
    }

    // Display result (Cable size approximation)
    document.getElementById('result').innerText = fullLoadCurrent.toFixed(2) + " A";
}
