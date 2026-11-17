import { Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private readonly document = inject(DOCUMENT);
  readonly isDarkMode = signal(false);

  constructor() {
    const savedTheme = localStorage.getItem('comicverse-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkMode = savedTheme ? savedTheme === 'dark' : prefersDark;

    this.isDarkMode.set(darkMode);
    this.applyTheme(darkMode);
  }

  toggleTheme(): void {
    const darkMode = !this.isDarkMode();
    this.isDarkMode.set(darkMode);
    this.applyTheme(darkMode);
  }

  private applyTheme(darkMode: boolean): void {
    this.document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('comicverse-theme', darkMode ? 'dark' : 'light');
  }
}
