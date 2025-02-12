import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto permite que Angular lo maneje sin necesidad de módulos
})
export class PredictionService {
  private apiUrl = 'http://localhost:5000/predict';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<{ prediction: number }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ prediction: number }>(this.apiUrl, formData);
  }
}
