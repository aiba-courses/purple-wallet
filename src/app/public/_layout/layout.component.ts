import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NgOptimizedImage, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
})
export class PublicLayoutComponent {
  title = 'purple-wallet';
}
