import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fib',
  templateUrl: './fib.component.html',
  styleUrls: ['./fib.component.scss']
})
export class FibComponent implements OnInit {
  private seenIndexes: number[] = [];
  public values: any = {};
  public form: FormGroup = this.fb.group({'index': ['']});

  constructor(private httpClient: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fetchValues();
    this.fetchIndexes();
  }

  getIndexes(): string {
    return this.seenIndexes.join(', ');
  }

  getValueIndexes(): string[] {
    return Object.keys(this.values);
  }

  fetchValues() {
    return this.httpClient.get<any>('/api/values/current').subscribe(data => {
      this.values = data;
    });
  }

  fetchIndexes() {
    return this.httpClient.get<any>('/api/values/all').subscribe(data => {
      this.seenIndexes = data;
    });
  }

  onSubmit() {
    const formData = this.form.value;

    return this.httpClient.post<any>('/api/values', formData).subscribe(data => {
      console.log(data);
    });
  }

}
