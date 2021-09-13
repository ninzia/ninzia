function redactRectangle ()
{
    var pluginWindow =
    {
        initialize: function (_someInitializer)
        {
            _someInitializer["load"]({ iwdt: this["widthMM"], itpg: this["tarpage"] })
        },

        commit: function (_someUIShit)
        {
            var _someOtherUIShit = _someUIShit["store"]()
            this["widthMM"] = _someOtherUIShit["iwdt"]
			this["tarpage"] = _someOtherUIShit["itpg"]
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
                            name: "rectangle width (mm):",
                            type: "static_text"
                        },
                        {
                            item_id: "iwdt",
                            type: "edit_text",
                            char_width: 5
                        },
						{
                            name: "target page:",
                            type: "static_text"
                        },
                        {
                            item_id: "itpg",
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
    
    pluginWindow["widthMM"] = "10"
	pluginWindow["tarpage"] = "2"
	app["execDialog"](pluginWindow)
	
	var widthMM = Number(pluginWindow["widthMM"])
    var widthPP = Math.round(widthMM * 2.83464567)
	var tarpage = Number(pluginWindow["tarpage"]) - 1

    var pageCoords = this["getPageBox"]("Crop", tarpage)
    var pageCoordsXL = pageCoords[0]
    var pageCoordsYL = pageCoords[1]
    var pageCoordsXU = pageCoords[2]
    var pageCoordsYU = pageCoords[3]

    var pageHeightPP = pageCoordsYU
    var pageWidthPP  = pageCoordsXU
    var pageCenterXPP = pageWidthPP / 2

	//

    this["addAnnot"](
        {
            page: tarpage,
            type: "Square",
            strokeColor: color.white,
            fillColor: color.white,
            rect:
                [
                    pageCenterXPP - widthPP / 2,
                    pageCoordsYL,
                    pageCenterXPP + widthPP / 2,
                    pageCoordsYU
                ]
        }
    )

    var rct = this.getAnnots(tarpage)[0].rect
    var left = rct[0];
    var right = rct[2];
    var top = rct[3];
    var bot = rct[1];
    var qd = [ [left, top, right, top, left, bot, right, bot] ]

    this["addAnnot"](
        {
            page: tarpage,
            type: "Redact",
            strokeColor: color.white,
            fillColor: color.white,
            quads: qd
        }
    )
}

app["addMenuItem"]({ cName: "balta juosta", cParent: "Edit", cExec: "redactRectangle()" })