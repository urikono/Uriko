function analyser() {
    const input = document.getElementById("multiplicateurs").value;
    const valeurs = input.split(",").map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    
    if (valeurs.length === 0) {
        document.getElementById("resultat").innerText = "⚠️ Aucun multiplicateur valide trouvé.";
        return;
    }

    const gros = valeurs.slice(-5).some(v => v >= 10);
    const crashCount = valeurs.slice(-5).filter(v => v <= 2).length;
    const moyenne = (valeurs.reduce((a, b) => a + b, 0) / valeurs.length).toFixed(2);
    const percentCrash = ((valeurs.filter(v => v <= 2).length / valeurs.length) * 100).toFixed(1);

    let message = "";

    if (gros) {
        message = "🔁 Pause recommandée (gros multiplicateur récent).";
    } else if (crashCount >= 3) {
        message = "📉 Beaucoup de crashs récents. Attends encore un peu.";
    } else {
        message = "✅ Bon moment pour miser à 2x. Mise conseillée : 100 CFA.";
    }

    document.getElementById("resultat").innerText = message;
    document.getElementById("stats").innerHTML = `📊 Stats : Moyenne = ${moyenne}x | % crashs <2x = ${percentCrash}%`;
}