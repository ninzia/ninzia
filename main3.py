from PyPDF2 import PdfFileWriter, PdfFileReader
import os
import shutil
import datetime

# config
# specify folders without trailing separator, i.e. "C:/pdfshit2", not "C:/pdfshit2/"

mpSourceDir = "C:/puslp/daug"
spSourceDir = "C:/puslp/vienas"
archiveDir  = "C:/puslp/archyvas"
outputDir   = "C:/puslp/pagamintas"

#

try:
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H-%M-%S")

    # debug 1

    print('(sp = single page; mp = multi page)')
    print()
    print('timestamp:         ' + timestamp)
    print('mpSourceDir:       ' + mpSourceDir)
    print('spSourceDir:       ' + spSourceDir)
    print('archiveDir:        ' + archiveDir)
    print('outputDir:         ' + outputDir)

    #

    listMP = os.listdir(mpSourceDir)
    if len(listMP) < 1:
        raise Exception('no source file found in ' + mpSourceDir)
    if len(listMP) > 1:
        raise Exception('multiple files found in ' + mpSourceDir)
    
    listSP = os.listdir(spSourceDir)
    if len(listSP) < 1:
        raise Exception('no source file found in ' + listSP)
    if len(listSP) > 1:
        raise Exception('multiple files found in ' + listSP)

    mpSourcePath = mpSourceDir + '/' + listMP[0]
    mpSourceName = os.path.basename(mpSourcePath)

    spSourcePath = spSourceDir + '/' + listSP[0]
    spSourceName = os.path.basename(spSourcePath)

    outputName = timestamp + ' ' + mpSourceName + ' + ' + spSourceName + '.pdf'
    outputPath = outputDir + '/' + outputName
    output     = PdfFileWriter()

    # debug 2

    print()
    print('mpSourceName:      ' + mpSourceName)
    print('mpSourcePath:      ' + mpSourcePath)
    print()
    print('spSourceName:      ' + spSourceName)
    print('spSourcePath:      ' + spSourcePath)
    print()
    print('outputName:        ' + outputName)
    print('outputPath:        ' + outputPath)
    print()

    #

    print("(if there's a PdfReadWarning warning here - ignore it)")

    mpSourceFile = PdfFileReader(mpSourcePath, 'rb')
    spSourceFile = PdfFileReader(spSourcePath, 'rb')

    mpSourcePagecount = mpSourceFile.getNumPages()
    spSourcePagecount = spSourceFile.getNumPages()

    # debug 3

    print()
    print('mpSourcePagecount: ' + str(mpSourcePagecount))
    print('spSourcePagecount: ' + str(spSourcePagecount))

    if spSourcePagecount > 1:
        print("WARNING: single page source PDF file has more than one page")

    #

    spSourcePage = spSourceFile.getPage(0)

    for i in range(mpSourcePagecount):
        mpSourcePage = mpSourceFile.getPage(i)
        output.addPage(mpSourcePage)
        output.addPage(spSourcePage)

    with open(outputPath, 'wb') as f:
        output.write(f)

    outputPagecount = output.getNumPages()

    archiveSubdir = archiveDir + '/' + outputName
    mpArchivePath = archiveSubdir + '/' + mpSourceName
    spArchivePath = archiveSubdir + '/' + spSourceName
    
    # debug 4
    
    print('outputPagecount:   ' + str(outputPagecount))
    print()
    print('archiveSubdir:     ' + archiveSubdir)
    print('mpArchivePath:     ' + mpArchivePath)
    print('spArchivePath:     ' + spArchivePath)
    print()
    
    #
    
    os.mkdir(archiveSubdir)
    shutil.move(mpSourcePath, mpArchivePath)
    shutil.move(spSourcePath, spArchivePath)

    print('OK')
    print('output PDF file = ' + outputPath)
except Exception as e:
    print('\nFAILED')
    print(e)
