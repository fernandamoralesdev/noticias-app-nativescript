import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';

// (1) Registra el módulo de Firebase Cloud Messaging (debe importarse una sola vez, al inicio)
import '@nativescript/firebase-messaging';

import { AppModule } from './app/app.module';

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

