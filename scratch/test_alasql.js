import alasql from 'alasql';

try {
    alasql('CREATE TABLE estudiantes (id INT, nombre STRING, ciudad STRING)');
    alasql('INSERT INTO estudiantes VALUES (1, "Ana", "Madrid"), (2, "Carlos", "Madrid"), (3, "Maria", "Valencia")');
    
    console.log("Testing with 'total':");
    const res1 = alasql('SELECT ciudad, COUNT(*) AS total FROM estudiantes GROUP BY ciudad HAVING total > 1');
    console.log(res1);
} catch (e) {
    console.error("Error with 'total':", e.message);
}

try {
    console.log("\nTesting with 'conteo':");
    const res2 = alasql('SELECT ciudad, COUNT(*) AS conteo FROM estudiantes GROUP BY ciudad HAVING conteo > 1');
    console.log(res2);
} catch (e) {
    console.error("Error with 'conteo':", e.message);
}

try {
    console.log("\nTesting with [total]:");
    const res3 = alasql('SELECT ciudad, COUNT(*) AS [total] FROM estudiantes GROUP BY ciudad HAVING [total] > 1');
    console.log(res3);
} catch (e) {
    console.error("Error with [total]:", e.message);
}
