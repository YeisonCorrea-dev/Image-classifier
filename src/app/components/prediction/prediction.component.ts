import { Component } from '@angular/core';
import { PredictionService } from '../../services/prediction.service'; // Verifica la ruta correcta

@Component({
  selector: 'app-prediction',
  standalone: true, // Especificar que es un componente independiente
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css'],
  imports: [] // Aquí puedes agregar otros módulos si los necesitas
})
export class PredictionComponent {
  selectedFile: File | null = null;
  predictionResult: number | null = null;
  errorMessage: string | null = null;

  constructor(private predictionService: PredictionService) {}

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Por favor, selecciona una imagen.';
      return;
    }

    this.predictionService.uploadImage(this.selectedFile).subscribe({
      next: (response) => {
        this.predictionResult = response.prediction;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'Error en la predicción. Inténtalo de nuevo.';
        console.error(error);
      }
    });
  }
}
