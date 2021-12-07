import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }
  termino: string ="";
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();
  
  
ngOnInit(): void {
  this.debouncer
    .pipe(debounceTime(300))
    .subscribe(value => {
      this.onDebounce.emit(value);
    });
}
search() {
  this.debouncer.next(this.termino);
  
}
}

