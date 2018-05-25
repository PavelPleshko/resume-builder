import { Component, OnInit,Input,AfterViewInit,ChangeDetectionStrategy } from '@angular/core';
import {DataManagerService} from '../../../common/services/data-manager.service';
import {map,distinctUntilChanged} from 'rxjs/operators';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as $ from 'jquery';


declare var canvg;

@Component({
  selector: 'app-work-panel',
  templateUrl: './work-panel.component.html',
  styleUrls: ['./work-panel.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WorkPanelComponent implements OnInit {
statusSaved:string;
documentTitle:string;
currentTooltipValue:string = 'Click here to change title';
editMode:boolean = false;
  constructor(private dataService:DataManagerService) { }

  ngOnInit() {
  	this.dataService.data.pipe(map((data:any)=>{
  		let obj = {title:data.activeLayout.title,
  			status:data.statusSaved};
  		return obj;
  	})).subscribe((update:any)=>{
  		if(update){
	  		this.documentTitle = update.title;
	  		this.statusSaved = update.status;
  		}
  	})
  }

enterEditMode(){
	if(!this.editMode){
		this.currentTooltipValue='';
		this.editMode = true;
		
	}

}
exitEditMode(){
	if(this.editMode){
		this.currentTooltipValue = 'Click here to change title';
		this.editMode = false;
	
	}
}

saveTitle(newTitle){
this.exitEditMode();
	this.dataService.updateTitle(this.documentTitle);
}

createNew(){
	this.dataService.createNewDocument();
}

saveDocument(){
	this.dataService.saveCurrentDocument().then((docName)=>{
		alert(`Document ${docName} successfully saved`);
		this.statusSaved = 'All changes saved';
	})
}


downloadPdf(){
	var self = this;
	this.cleanUp();
	 let l = {
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
                compress: true,
                lineHeight: 1,
                autoSize: false,
                printHeaders: true
            };

            let pdf = new jsPDF(l);
	this.replaceSvgsWithCanvas(pdf,function onComplete() {
		
  html2canvas(document.getElementById('pdf')).then(function(canvasObj){
   
      self.startPrintProcess(pdf,canvasObj, 'printedPDF',function (){
        alert('PDF saved');
        self.cleanUp();
      });
    }
  );
});
}

cleanUp(){
	
	[].forEach.call(document.getElementsByClassName('tempImage'),(el)=>{
		el.parentNode.removeChild(el);
	})
	let svgs = document.getElementsByTagName('svg');
	[].forEach.call(svgs,(el)=>{
		
		el['style'].width='100%';
		el['style'].height='100%';
		el.style.display='block';
	})

	

}

startPrintProcess(pdf,canvasObj, fileName, callback) {
   var canvasToImage = function (canvas: any) {
            var img = new Image();
            var dataURL = canvas.toDataURL('image/png');
            img.src = dataURL;
            return img;
        };
        var canvasShiftImage = function (oldCanvas: any, shiftAmt: any) {
            shiftAmt = parseInt(shiftAmt) || 0;
            if (!shiftAmt) { return oldCanvas; }

            var newCanvas = document.createElement('canvas');
            newCanvas.height = oldCanvas.height - shiftAmt;
            newCanvas.width = oldCanvas.width;
            var ctx = newCanvas.getContext('2d');
            ctx['imageSmoothingEnabled'] = false; /* standard */
            ctx['mozImageSmoothingEnabled'] = false; // Firefox 
            ctx['oImageSmoothingEnabled'] = false; // Opera /
            ctx['webkitImageSmoothingEnabled'] = false; // Safari /
            ctx['msImageSmoothingEnabled'] = false; // IE */
            var img = canvasToImage(oldCanvas);
            ctx.drawImage(img, 0, shiftAmt, img.width, img.height, 0, 0, img.width, img.height);

            return newCanvas;
        };


        var canvasToImageSuccess = function (pdf,canvas: any) {
           
                let pdfInternals = pdf.internal,
                pdfPageSize = pdfInternals.pageSize,
                pdfScaleFactor = pdfInternals.scaleFactor,
                pdfPageWidth = pdfPageSize.width,
                pdfPageHeight = pdfPageSize.height,
                totalPdfHeight = 0,
                htmlPageHeight = canvas.height,
                htmlScaleFactor = canvas.width / (pdfPageWidth * pdfScaleFactor),
                safetyNet = 0;
            while (totalPdfHeight < htmlPageHeight && safetyNet < 15) {
                var newCanvas = canvasShiftImage(canvas, totalPdfHeight);
                pdf.addImage(newCanvas, 'PNG', 0, 0, pdfPageWidth, pdfPageHeight, 'NONE', 'SLOW');

                totalPdfHeight += (pdfPageHeight * pdfScaleFactor * htmlScaleFactor);

                // if (totalPdfHeight < (htmlPageHeight)) {
                //     pdf.addPage();
                // }
                safetyNet++;
            }
           
            pdf.save('resume.pdf');
        };

   

        html2canvas(document.getElementById('pdf')).then((canvas: any) => {
            canvasToImageSuccess(pdf,canvas);
          
            callback();
        });
    
    
}


replaceSvgsWithCanvas(pdf,callback) {
  var $container = $('#pdf');
  var svgElements = $container.find('svg');

  svgElements.each(function(){
    var newCanvas, xml;
    
    this.style.width = this.parentNode.style.width;
    this.style.height = this.parentNode.style.height;
    newCanvas = document.createElement("canvas");   

    let newCtx = newCanvas.getContext('2d');
    let pixelRatio = window.devicePixelRatio || 1;

    newCanvas.style.width = newCanvas.width +'px';
	newCanvas.style.height = newCanvas.height +'px';
	newCanvas.width *= pixelRatio;
	newCanvas.height *= pixelRatio;
	newCtx.setTransform(pixelRatio,0,0,pixelRatio,0,0);

    xml = (new XMLSerializer()).serializeToString(this);
    xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');
   	canvg(newCanvas, xml);
    let src= newCanvas.toDataURL();
	 let newImg = new Image();
	 newImg.src=src;
	 newImg.style.width = newCanvas.style.width;
	newImg.style.height = newCanvas.style.height;
	newImg.className='tempImage';
    $(newImg).insertAfter(this);
    $(this).hide();
  });
  callback();
};
}
