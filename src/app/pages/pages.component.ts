import { Component, OnInit } from '@angular/core';
import { HelperService } from '../util/HelperService';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor( public helperService: HelperService ) { }

  ngOnInit(): void {
  }

}
