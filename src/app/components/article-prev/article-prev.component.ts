import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-article-prev',
  templateUrl: './article-prev.component.html',
  styleUrls: ['./article-prev.component.css']
})
export class ArticlePrevComponent implements OnInit {
  
  constructor() { }

  fileIcons = [
    { ext: 'png', icon: 'iwwa:file-png' },
    { ext: 'jpg', icon: 'ant-design:file-jpg-outline' },
    { ext: 'jpeg', icon: 'ant-design:file-jpg-outline' },
    { ext: 'xlsx', icon: 'simple-icons:microsoft excel' },
    { ext: 'xls', icon: 'simple-icons:microsoft excel' },
    { ext: 'doc', icon: 'simple-icons:microsoftword' },
    { ext: 'docx', icon: 'simple-icons:microsoftword' },
    { ext: 'odt', icon: 'icomoon-free:file-openoffice' },
    { ext: 'ods', icon: 'whh:spreadsheet' },
    { ext: 'pdf', icon: 'iwwa:file-pdf' },
    { ext: 'ppt', icon: 'simple-icons:microsoftpowerpoint' },
    { ext: 'pptx', icon: 'simple-icons:microsoftpowerpoint' },
    { ext: 'txt', icon: 'ant-design:file-text-outline' },
    { ext: 'zip', icon: 'ant-design:file-zip-outline' },
    { ext: 'rar', icon: 'ant-design:file-zip-outline' },
    { ext: 'z', icon: 'ant-design:file-zip-outline' },
    { ext: 'csv', icon: 'iwwa:file-csv' },
    { ext: 'svg', icon: 'icomoon-free:svg' },
    { ext: 'cda', icon: 'icons8:audio-file' },
    { ext: 'mid', icon: 'mdi:midi' },
    { ext: 'midi', icon: 'mdi:midi' },
    { ext: 'mp3', icon: 'el:speaker' },
    { ext: 'mpa', icon: 'icons8:audio-file' },
    { ext: 'ogg', icon: 'icons8:audio-file' },
    { ext: 'wav', icon: 'icons8:audio-file' },
    { ext: 'wma', icon: 'icons8:audio-file' },
    { ext: 'wpl', icon: 'mdi:playlist-music' },
    { ext: '7z', icon: 'ant-design:file-zip-outline' },
    { ext: 'arj', icon: 'ant-design:file-zip-outline' },
    { ext: 'pkg', icon: 'uil:package' },
    { ext: 'tar', icon: 'ant-design:file-zip-outline' },
    { ext: 'bin', icon: 'octicon:file-binary' },
    { ext: 'iso', icon: 'ic:outline-disc-full' },
    { ext: 'vcd', icon: 'ic:outline-disc-full' },
    { ext: 'dat', icon: 'ant-design:file-text-outline' },
    { ext: 'dat', icon: 'ant-design:file-text-outline' },
    { ext: 'mdb', icon: 'entypo:database' },
    { ext: 'exe', icon: 'octicon:file-binary' }
  ]

  @Input() fileName:string;
  @Input() articleId:string;

  ngOnInit() {

  }

  getIconName(){

    let fileExt = this.fileName.split('.')[this.fileName.split('.').length - 1]

    let defaultIcon = 'ant-design:file-unknown-outline'

    let iconData = this.fileIcons.find( ({ext}) => ext == fileExt )

    return iconData ? iconData.icon : defaultIcon
  }

  getLink = () => `http://localhost:3001/files/${this.articleId}/${this.fileName}`
  

}
