import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [NgOptimizedImage, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
})
export class PublicLayoutComponent {
  private __authService: AuthService = inject(AuthService);

  title = 'purple-wallet';
}
