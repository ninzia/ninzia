If WinExists("Zoombook downloader") Then WinClose("Zoombook downloader")
Sleep(6000)
While 1
   If WinExists("Zoombook downloader") = False Then
	  Run('"C:\Program Files (x86)\Zoombook downloader\Python\pythonw.exe" "C:\Program Files (x86)\Zoombook downloader\Zoombook_downloader.launch.pyw"')
	  Sleep(8000)
   Else
   ExitLoop
   EndIf
   Sleep(8000)
   WEnd
If WinExists("Zoombook downloader") = True Then
   Sleep(8000)
   WinActivate("Zoombook downloader")
   Sleep(1000)
   Send ("{right}")
   WinActivate("Zoombook downloader")
   Sleep(1000)
   Send ("{right}")
   Sleep(2000)
   WinActivate("Zoombook downloader")
   Send ("{tab}")
   Sleep(2000)
   WinActivate("Zoombook downloader")
   Send ("{space}")
   Sleep(20000)
   WinActivate("Zoombook downloader")
   Sleep(6000)
   Send ("{tab}")
   Sleep(2000)
   Send ("{space}")
EndIf