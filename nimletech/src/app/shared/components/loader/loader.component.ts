import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() isLoading = true;
  @Input() message: string | undefined;
  @Input() size: string;
  @Input() fullScreen: boolean;
  constructor() {
    this.size = this.size || 'small';
  }
  ngOnInit(): void {}
}
