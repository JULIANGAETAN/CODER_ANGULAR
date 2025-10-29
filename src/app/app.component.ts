import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DashboardModule } from './features/dashboard/dashboard.module';
import { ThemeService } from './core/services/theme/theme.service';
import { AngularToastifyModule } from 'angular-toastify';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, DashboardModule, AngularToastifyModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ThemeService],
})
export class AppComponent implements OnInit {
  title = 'Platform Learning';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    const theme = this.themeService.getTheme();

    if (theme === 'dark' || theme === 'light') {
      this.themeService.setTheme(theme);
      return;
    }

    this.themeService.setTheme('light');
  }
}

