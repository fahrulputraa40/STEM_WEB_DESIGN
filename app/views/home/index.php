<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
    <title>Dashboard - IoT Server</title>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="tab">
                Dashboard
            </div>
        </div>
        <div class="title">
            <span style="margin-left: 50px;">Water Monitoring</span>
            <span onclick="sidePanel(true)"><i style="padding-top: 6px; margin-left: 1100px; cursor: pointer;" class="fas fa-cog"></i></span>
        </div>
        <div class="status">
            <span style="display: inline-block; width: 110px;">TDS Monitoring</span>
            <span style="display: inline-block; width: 440px;">
                Time:
                <div class="date">
                    12-12-2020, 19:00
                </div> -
                <div class="date">
                    12-12-2020, 19:00
                </div>
            </span>
            <span style="display: inline-block; border-right: none;">
                Device Status:
                <div class="device_status">
                    Online
                </div>
                <div class="bullet"></div>
            </span>
        </div>
        <div class="grid-layout">
            <div class="graph">
                <div class="title-layout">
                    TDS Monitoring Value
                </div>
                <div id="chart"></div>
            </div>
            <div class="vl"></div>
            <div class="tableVal">
                <div class="update-table">
                    New Value. Update...
                </div>
                <div class="table">
                    <div class="title-layout table-title">
                        <span style=" display: inline-block; width: 40px;">No</span>
                        <span style=" display: inline-block; width: 180px;">Date</span>
                        <span style=" display: inline-block; width: 40px;">Value</span>
                    </div>
                    <div class="value"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="side">
       <div style="padding-top: 5px;margin-bottom: 10px; height: 40px;" class="side-title">
        <h3 style="padding: 5px; display: inline; float: left;">Calibration</h3>
        <h3 onclick="sidePanel(false)" style="border-radius: 5px; border: 1px solid gray; padding: 5px 10px; display: inline; float: right; cursor: pointer;">x</h4>
        <div style="clear: both;"></div>
        </div>
        <form action="#" method="get" onclick="updateCalibration()">
            <label style="padding: 10px 0; margin-right: 4px;" for="cal">Calibration Value</label>
            <input style="padding: 2px 0;" type="text" name="cal" id="cal">
            <button style="cursor: pointer; width: 100%; padding: 4px; margin-top: 10px;display: block;" type="submit">Setting</button>
        </form>
    </div>
    <script src="https://d3js.org/d3.v6.min.js"></script>
    <script src="index.js"></script>
</body>

</html>