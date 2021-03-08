/*
Copyright 2012 Ademes
Copyright 2021 sorryDude

Permi\u00DFion is hereby granted, free of charge, to any person obtaining a copy of this software and a\u00DFociated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:


The above copyright notice and this permi\u00DFion notice shall be included in all copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRE\u00DF OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNE\u00DF FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

    ScriptAPI.register('Truppen z\u00E4hlen', true, 'Ademes, sorryDude', 'support-nur-im-forum@die-staemme.de');

    Scriptversion = '1.7';

    if (top.frames.length > 1){
        var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
    } else {
        var doc = document;
    };
    if (!doc.URL.match('mode=units')){
        UI.InfoMe\u00DFage('Du mu\u00DFt dich auf der "Truppen"-\u00FCbersicht befinden!',3000,true);
    } else {
        ADS_Truppen_zaehlen(doc);
    };
    function ADS_Truppen_zaehlen(doc){
        if (typeof(world) == 'undefined') {
                units = Array(Array(0,'Spear fighters'),Array(1,'Swordsmen'),Array(2,'Axeman'),Array(3,'Scout'),Array(4,'Light cavalry'),Array(5,'Heavy cavalry'),Array(6,'Ram'),Array(7,'Catapult'));	
        } else {	
            if (world == 'oBogen') {
                units = Array(Array(0,'Spear fighters'),Array(1,'Swordsmen'),Array(2,'Axeman'),Array(3,'Scout'),Array(4,'Light cavalry'),Array(5,'Heavy cavalry'),Array(6,'Ram'),Array(7,'Catapult'));		
            } else if (world == 'mBogen') {
                units = Array(Array(0,'Spear fighters'),Array(1,'Swordsmen'),Array(2,'Axeman'),Array(3,'Scout'),Array(4,'Light cavalry'),Array(5,'Heavy cavalry'),Array(6,'Ram'),Array(7,'Catapult'));	
            }
        }
        
        units_count = units.length;
        troops = new Array(units_count);
        for (var i = 0; i < units_count; i++)
        troops[i]=0;
        village_count = 0;
        var troops_cells = document.getElementById('units_table').getElementsByTagName('td');
        
        for (var x = 0; x < troops_cells.length; x++) {	
            if (typeof(art) == 'undefined') {
                art = "Gesamt";
                if (troops_cells[x].firstChild.nodeValue == 'your own' || troops_cells[x].firstChild.nodeValue == 'outwards'  || troops_cells[x].firstChild.nodeValue == 'in transit') {
                    village_count += 1;
                    next = troops_cells[x].nextSibling;
                    for (var y = 0; y < units_count; y++) {
                        do {next = next.nextSibling;} while (next.nodeType != 1)
                    troops[y] += parseInt(next.firstChild.nodeValue);
                    }
                }
            } else {	
                if (art == 'Here') {
                    if (troops_cells[x].firstChild.nodeValue == 'your own') {
                        village_count += 1;
                        next = troops_cells[x].nextSibling;
                        for (var y = 0; y < units_count; y++) {
                            do {next = next.nextSibling;} while (next.nodeType != 1)
                        troops[y] += parseInt(next.firstChild.nodeValue);
                        }
                    }
                } else if (art == 'Outwards') {
                    if (troops_cells[x].firstChild.nodeValue == 'outwards'  || troops_cells[x].firstChild.nodeValue == 'in transit') {
                        village_count += 1;
                        next = troops_cells[x].nextSibling;
                        for (var y = 0; y < units_count; y++) {
                            do {next = next.nextSibling;} while (next.nodeType != 1)
                        troops[y] += parseInt(next.firstChild.nodeValue);
                        }
                    }
                } else if (art == 'Gesamt') {
                    if (troops_cells[x].firstChild.nodeValue == 'your own' || troops_cells[x].firstChild.nodeValue == 'outwards'  || troops_cells[x].firstChild.nodeValue == 'in transit') {
                        village_count += 1;
                        next = troops_cells[x].nextSibling;
                        for (var y = 0; y < units_count; y++) {
                            do {next = next.nextSibling;} while (next.nodeType != 1)
                        troops[y] += parseInt(next.firstChild.nodeValue);
                        }
                    }	
                }
            }
        }
        if (village_count > 0) {
            var output ='';
            for (var i = 0; i < units_count; i++) {
                output += "<tr><td style='color:blue; font-weight: bold;'> " + units[i][1] + " </td><td style='color:red; text-align:right'>" + troops[i] + "</td></tr>";
            }
            if ($('#ADS_Display').length==0){
                $('.maincell').append("<div id='ADS_Display' style='position: fixed; top: 51px; left: 20px; border-radius: 8px; border: 2px #804000 solid; background-color: #F1EBDD'><div id='inline_popup_menu' style='cursor: auto; text-align:center;'>Truppen\u00FCbersicht: "+ art +"</div><div style='padding: 15px 10px 5px 10px;'><table id='ADS_Display_Main' style='vertical-align:middle;'></table><br><a onclick='$(\"#ADS_Display\").remove();' style='cursor: pointer;'>Schlie\u00DFen</a></div></div>");
            } else {
                $("#ADS_Display").show();
            }
            $("#ADS_Display_Main").html(output);
        } else {
            UI.InfoMe\u00DFage('Fehler! Keine DÃƒÂ¶rfer/Truppen gefunden!',3000,true);
        } 
    };



