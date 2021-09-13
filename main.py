from PyPDF2 import PdfFileWriter, PdfFileReader
import os
import shutil
import ntpath
import datetime

root = os.path.dirname(os.path.realpath(__file__))

for type in ['f1', 'f2', 'f3']:
    print('processing ' + type)
    inputfiles = []

    for currentpath, folders, files in os.walk(root + '/input'):
        for file in files:
            if '.' + type + '.pdf' in file:
                inputfiles.append(os.path.join(currentpath, file))

    current = 0
    success = 0
    skipped = 0
    failed  = 0

    ts = datetime.datetime.now().strftime("%d %B %Y %I.%M%p")

    for inputpath in inputfiles:
        current     = current + 1
        filename    = ntpath.basename(inputpath)
        failedpath  = root + '/failed/' + filename

        dir = ''

        if '.f1.pdf' in filename:
            dir = root + '/output/f1/' + ts
        elif '.f2.pdf' in filename:
            dir = root + '/output/f2/' + ts
        elif '.f3.pdf' in filename:
            dir = root + '/output/f3/' + ts
        else:
            dir = root + '/output/' + ts

        outputpath = dir + '/' + filename

        if os.path.isdir(dir) == False:
            os.mkdir(dir)
        elif os.path.isfile(outputpath):
            print(str(current) + '/' + str(len(inputfiles)) + ' SKIP (exists): ' + filename)
            skipped = skipped + 1
            continue

        try:
            input  = PdfFileReader(inputpath, 'rb')
            output = PdfFileWriter()

            pagecount = input.getNumPages()

            if pagecount < 26:
                print(str(current) + '/' + str(len(inputfiles)) + ' SKIP (fewer than 26 pages): ' + filename)
                skipped = skipped + 1
                continue

            output.addPage(input.getPage(pagecount - 2))
            output.addPage(input.getPage(pagecount - 1))

            for i in range(pagecount - 2):
                page = input.getPage(i)
                output.addPage(page)

            with open(outputpath, 'wb') as f:
                output.write(f)

            os.remove(inputpath)
            print(str(current) + '/' + str(len(inputfiles)) + ' OK:   ' + filename)
            success = success + 1
        except:
            print(str(current) + '/' + str(len(inputfiles)) + ' FAIL: ' + filename)
            failed = failed + 1
            shutil.move(inputpath, failedpath)
    print('success: ' + str(success))
    print('skipped: ' + str(skipped))
    print('failed:  ' + str(failed))

    for currentpath, folders, files in os.walk(root + '/input'):
        for folder in folders:
            ffolder = os.path.join(currentpath, folder)
            if len(os.listdir(ffolder)) < 1:
                os.rmdir(ffolder)