const express = require('express');
const app = express();
const firmwareData = require('./docs/firmware.json'); // Use the generated JSON

app.get('/firmware/:device', (req, res) => {
  const device = req.params.device;
  if (firmwareData[device]) {
    res.json(firmwareData[device]);
  } else {
    res.status(404).json({ error: "Device not found" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Test API running at http://localhost:${PORT}`);
});
