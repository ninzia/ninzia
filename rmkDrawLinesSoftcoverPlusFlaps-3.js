function rmkDrawLinesSoftcoverPlusFlaps ()
{
    var pluginWindow =
    {
        initialize: function (_someInitializer)
        {
            _someInitializer["load"](
                {
                    iwid: this["widthMM"],
                    ihei: this["heightMM"],
                    ispi: this["spineMM"],
                    ifla: this["flapsMM"]
                }
            )
        },

        commit: function (_someUIShit)
        {
            var _someOtherUIShit = _someUIShit["store"]()
            this["widthMM"]  = _someOtherUIShit["iwid"]
            this["heightMM"] = _someOtherUIShit["ihei"]
            this["spineMM"] = _someOtherUIShit["ispi"]
            this["flapsMM"]  = _someOtherUIShit["ifla"]
        },
		
        description:
        {
            name: "Input Dialog",
            elements:
            [
                {
                    type: "view",
                    elements:
                    [
                        {
                            name: "width (mm):",
                            type: "static_text"
                        },
                        {
                            item_id: "iwid",
                            type: "edit_text",
                            char_width: 5
                        },
                        {
                            name: "height (mm):",
                            type: "static_text"
                        },
                        {
                            item_id: "ihei",
                            type: "edit_text",
                            char_width: 5
                        },
                        {
                            name: "spine (mm):",
                            type: "static_text"
                        },
                        {
                            item_id: "ispi",
                            type: "edit_text",
                            char_width: 5
                        },
                        {
                            name: "flaps (mm):",
                            type: "static_text"
                        },
                        {
                            item_id: "ifla",
                            type: "edit_text",
                            char_width: 5
                        },
                        {
                            type: "gap"
                        },
                        {
                            type: "ok_cancel"
                        }
                    ]
                }
            ]
        }
    }
    
    pluginWindow["widthMM"] = "0"
	pluginWindow["heightMM"] = "0"
    pluginWindow["spineMM"] = "0"
    pluginWindow["flapsMM"] = "0"
	app["execDialog"](pluginWindow)

    // CONFIG CONSTANTS

    var OPT_TBOX_HEIGHT = 15
    var OPT_TBOX_PP_PER_CHAR = 10 // the font in annotations isn't monospace and there isn't a default monospace font, so it's better to set this shit higher than seemingly needed
    var OPT_TBOX_DISPLAY_ID = false
    var OPT_LINE_TOGGLE_POINTY_ENDS = false
    var OPT_FORCE_DISPLAY_TBOX = false

    // util

    var mm2pp = function (n)
    {
        return n * 2.83464567
    }

    var pp2mm = function (n)
    {
        return n / 72 / 0.039370
    }

    var that = this

	// dimensions

    var widthMM = Number(pluginWindow["widthMM"])
    var heightMM = Number(pluginWindow["heightMM"])
    var spineMM = Number(pluginWindow["spineMM"])
    var flapsMM = Number(pluginWindow["flapsMM"])

    var $width = Math.round(widthMM * 2.83464567)
    var $height = Math.round(heightMM * 2.83464567)
    var $spine = Math.round(spineMM * 2.83464567)
    var $flaps = Math.round(flapsMM * 2.83464567)

    var pageCoords = this["getPageBox"]("Crop", 0)
    var $pageHeight = pageCoords[1]
    var $pageWidth  = pageCoords[2]

    if (widthMM * 2 + spineMM + flapsMM * 2 + 4 > 695)
    {
        app.alert('bendras ilgis > 695mm!', 3)
    }

    // adding the lines

    var lines = []

    if ($flaps === 0)
    {
        lines.push(
            {
                id: 'line 1',
                x1: $pageWidth / 2 - $spine / 2,
                y1: $pageHeight / 2 - $height / 2,
                x2: $pageWidth / 2 - $spine / 2,
                y2: $pageHeight / 2 + $height / 2
            }
        )

        lines.push(
            {
                id: 'line 2',
                x1: $pageWidth / 2 + $spine / 2,
                y1: $pageHeight / 2 - $height / 2,
                x2: $pageWidth / 2 + $spine / 2,
                y2: $pageHeight / 2 + $height / 2
            }
        )

        lines.push(
            {
                id: 'line 3',
                x1: $pageWidth / 2 - $spine / 2 - $width,
                y1: $pageHeight / 2 - $height / 2,
                x2: $pageWidth / 2 - $spine / 2 - $width,
                y2: $pageHeight / 2 + $height / 2,
                labelPos: 'top'
            }
        )

        lines.push(
            {
                id: 'line 4',
                x1: $pageWidth / 2 + $spine / 2 + $width,
                y1: $pageHeight / 2 - $height / 2,
                x2: $pageWidth / 2 + $spine / 2 + $width,
                y2: $pageHeight / 2 + $height / 2
            }
        )

        lines.push(
            {
                id: 'line 5',
                x1: $pageWidth / 2 - $spine / 2 - $width,
                y1: $pageHeight / 2 - $height / 2,
                x2: $pageWidth / 2 + $spine / 2 + $width,
                y2: $pageHeight / 2 - $height / 2
            }
        )

        //


        lines.push(
            {
                id: 'line 12',
                x1: $pageWidth / 2 - $spine / 2 - $width,
                y1: $pageHeight / 2 + $height / 2,
                x2: $pageWidth / 2 - $spine / 2,
                y2: $pageHeight / 2 + $height / 2,
                labelPos: 'top'
            }
        )

        lines.push(
            {
                id: 'line 13',
                x1: $pageWidth / 2 + $spine /2,
                y1: $pageHeight / 2 + $height / 2,
                x2: $pageWidth / 2 + $spine / 2 + $width,
                y2: $pageHeight / 2 + $height / 2,
                labelPos: 'top'
            }
        )

        lines.push(
            {
                id: 'line 15',
                x1: $pageWidth / 2 - $spine / 2,
                y1: $pageHeight / 2 + $height / 2,
                x2: $pageWidth / 2 + $spine /2,
                y2: $pageHeight / 2 + $height / 2,
                labelPos: 'top'
            }
        )
    }
    else // flaps =/= 0
    {

        lines.push(
            {
                id: 'line 1',
                x1: $pageWidth / 2 - $spine / 2,
                y1: $pageHeight / 2 - $height / 2,
                x2: $pageWidth / 2 - $spine / 2,
                y2: $pageHeight / 2 + $height / 2,
                //labelPos: 'top',
            }
        )

        lines.push(
            {
                id: 'line2',
                x1: $pageWidth / 2 + $spine /2,
                y1: $pageHeight / 2 - $height / 2,
                x2: $pageWidth / 2 + $spine / 2,
                y2: $pageHeight / 2 + $height / 2,
                //labelPos: 'top',
            }
        )

        lines.push(
            {
                id: 'line 3',
                x1: $pageWidth / 2 - $spine / 2 - $width - mm2pp(2),
                y1: $pageHeight / 2 - $height / 2,
                x2: $pageWidth / 2 - $spine / 2 - $width - mm2pp(2),
                y2: $pageHeight / 2 + $height / 2,
                //labelPos: 'top',
            }

        )

        lines.push(
            {
                id: 'line 4',
                x1: $pageWidth / 2 + $spine / 2 + $width + mm2pp(2),
                y1: $pageHeight / 2 - $height / 2,
                x2: $pageWidth / 2 + $spine / 2 + $width + mm2pp(2),
                y2: $pageHeight / 2 + $height / 2,
                //labelPos: 'top',
            }
        )

        lines.push(
            {
                id: 'line 7',
                x1: $pageWidth / 2 - $spine / 2 - $width - mm2pp(2) - $flaps,
                y1: $pageHeight / 2 - $height / 2,
                x2: $pageWidth / 2 - $spine / 2 - $width - mm2pp(2) - $flaps,
                y2: $pageHeight / 2 + $height / 2,
                labelPos: 'top'
            }
        )

        lines.push(
            {
                id: 'line 8',
                x1: $pageWidth / 2 + $spine / 2 + $width + mm2pp(2) + $flaps,
                y1: $pageHeight / 2 - $height / 2,
                x2: $pageWidth / 2 + $spine / 2 + $width + mm2pp(2) + $flaps,
                y2: $pageHeight / 2 + $height / 2,
                //labelPos: 'top',
            }
        )

        lines.push(
            {
                id: 'line 9',
                x1: $pageWidth / 2 - $spine / 2 - $width - mm2pp(2) - $flaps,
                y1: $pageHeight / 2 - $height / 2,
                x2: $pageWidth / 2 + $spine / 2 + $width + mm2pp(2) + $flaps,
                y2: $pageHeight / 2 - $height / 2,
                //labelPos: 'top',
            }
        )

        lines.push(
            {
                id: 'line 10',
                x1: $pageWidth / 2 - $spine / 2 - $width - mm2pp(2) - $flaps,
                y1: $pageHeight / 2 + $height / 2,
                x2: $pageWidth / 2 + $spine / 2 + $width + mm2pp(2) + $flaps,
                y2: $pageHeight / 2 + $height / 2,
                //labelPos: 'top',
            }
        )

        //

        lines.push(
            {
                id: 'line 11',
                x1: $pageWidth / 2 - $spine / 2 - $width - mm2pp(2) - $flaps,
                y1: $pageHeight / 2 + $height / 2,
                x2: $pageWidth / 2 - $spine / 2 - $width - mm2pp(2),
                y2: $pageHeight / 2 + $height / 2,
                labelPos: 'top'
            }
        )

        lines.push(
            {
                id: 'line 12',
                x1: $pageWidth / 2 - $spine / 2 - $width - mm2pp(2),
                y1: $pageHeight / 2 + $height / 2,
                x2: $pageWidth / 2 - $spine / 2,
                y2: $pageHeight / 2 + $height / 2,
                labelPos: 'top'
            }
        )

        lines.push(
            {
                id: 'line 13',
                x1: $pageWidth / 2 + $spine /2,
                y1: $pageHeight / 2 + $height / 2,
                x2: $pageWidth / 2 + $spine / 2 + $width + mm2pp(2),
                y2: $pageHeight / 2 + $height / 2,
                labelPos: 'top'
            }
        )

        lines.push(
            {
                id: 'line 14',
                x1: $pageWidth / 2 + $spine / 2 + $width + mm2pp(2),
                y1: $pageHeight / 2 + $height / 2,
                x2: $pageWidth / 2 + $spine / 2 + $width + mm2pp(2) + $flaps,
                y2: $pageHeight / 2 + $height / 2,
                labelPos: 'top'
            }
        )

        lines.push(
            {
                id: 'line 15',
                x1: $pageWidth / 2 - $spine / 2,
                y1: $pageHeight / 2 + $height / 2,
                x2: $pageWidth / 2 + $spine /2,
                y2: $pageHeight / 2 + $height / 2,
                labelPos: 'top'
            }
        )
    }

    // drawing

    /// lines

    for (var i = 0; i < lines.length; i++)
    {
        var line = lines[i]

        this.addAnnot(
            {
                page: 0,
                type: "Line",
                points: [[line.x1, line.y1], [line.x2, line.y2]],
                arrowBegin: OPT_LINE_TOGGLE_POINTY_ENDS ? 'OpenArrow' : 'None',
                arrowEnd:   OPT_LINE_TOGGLE_POINTY_ENDS ? 'OpenArrow' : 'None',
            }
        )
    }

    /// textboxes

    var drawTextboxHorizontal = function (line)
    {
        var lineLength = Math.abs(line.x1 - line.x2)
        var upperX = line.x1 > line.x2 ? line.x1 : line.x2
        var lineCenter = upperX - lineLength / 2

        var lengthMM = pp2mm(lineLength)
        var int = Math.floor(lengthMM)
        var frc = lengthMM - int
        lengthMM = frc >= 0.5 ? Math.ceil(lengthMM) : Math.floor(lengthMM)

        var tboxText = lengthMM + 'mm'
        if (OPT_TBOX_DISPLAY_ID) tboxText = line.id + ' ' + tboxText
        var tboxWidth = tboxText.length * OPT_TBOX_PP_PER_CHAR
        var tboxOffset = line.labelPos === 'top' ? 0 : OPT_TBOX_HEIGHT * -1

        var xll = lineCenter - tboxWidth / 2
        var yll = line.y1 + tboxOffset
        var xur = lineCenter + tboxWidth / 2
        var yur = line.y1 + OPT_TBOX_HEIGHT + tboxOffset

        that.addAnnot(
            {
                page: 0,
                type: "FreeText",
                rect: // [xll, yll, xur, yur]
                    [
                        xll, // xll
                        yll, // yll
                        xur, // xur
                        yur  // yur
                    ],
                contents: tboxText,
                alignment: 1,
                rotate: 0
            }
        )
    }

    var drawTextboxVertical = function (line)
    {
        var lineLength = Math.abs(line.y1 - line.y2)
        var upperY = line.y1 > line.y2 ? line.y1 : line.y2
        var lineCenter = upperY - lineLength / 2

        var lengthMM = pp2mm(lineLength)
        var int = Math.floor(lengthMM)
        var frc = lengthMM - int
        lengthMM = frc >= 0.5 ? Math.ceil(lengthMM) : Math.floor(lengthMM)

        var tboxText = lengthMM + 'mm'
        if (OPT_TBOX_DISPLAY_ID) tboxText = line.id + ' ' + tboxText
        var tboxWidth = tboxText.length * OPT_TBOX_PP_PER_CHAR
        var tboxOffset = line.labelPos === 'top' ? 0 : OPT_TBOX_HEIGHT

        var xll = (line.x1 - OPT_TBOX_HEIGHT) + tboxOffset
        var yll = lineCenter - tboxWidth / 2
        var xur = line.x1 + tboxOffset
        var yur = lineCenter + tboxWidth / 2

        that.addAnnot(
            {
                page: 0,
                type: "FreeText",
                rect: // [xll, yll, xur, yur]
                    [
                        xll, // xll
                        yll, // yll
                        xur, // xur
                        yur  // yur
                    ],
                contents: tboxText,
                alignment: 1,
                rotate: 90
            }
        )
    }

    for (i = 0; i < lines.length; i++)
    {
        line = lines[i]

        if (!line.labelPos)
        {
            if (!OPT_FORCE_DISPLAY_TBOX)
            {
                continue
            }
            else
            {
                line.labelPos = 'top'
            }
        }

        if (line.x1 === line.x2)
        {
            drawTextboxVertical(line)
        }
        else
        {
            drawTextboxHorizontal(line)
        }
    }
}

app["addMenuItem"]({ cName: "[rmk] DrawLines (SoftCover + Flaps)", cParent: "Edit", cExec: "rmkDrawLinesSoftcoverPlusFlaps()" })