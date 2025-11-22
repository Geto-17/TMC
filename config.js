// Set this to the address your phone/emulator should use to reach the dev server.
// Examples:
// - Android emulator (AVD): 'http://10.0.2.2:3000'
// - Genymotion: 'http://10.0.3.2:3000'
// - iOS simulator: 'http://localhost:3000'
// - Physical device on same Wi-Fi: 'http://192.168.1.42:3000' (replace with your PC's LAN IP)


// For production builds with EAS you can set EXPO_PUBLIC_API_BASE; otherwise we fall back to the local dev IP.
// When building with EAS, set EXPO_PUBLIC_API_BASE to your deployed backend URL (https://your-backend.onrender.com)
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FALLBACK_LOCAL = 'http://192.168.100.5:3000';

// export a mutable binding so other modules see updates made at runtime
export let API_BASE = process.env.EXPO_PUBLIC_API_BASE || FALLBACK_LOCAL;

const LAST_KEY = 'last_known_api_base_v1';

async function testPing(url, timeout = 2000) {
	try {
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeout);
		const res = await fetch(`${url.replace(/\/$/, '')}/ping`, { signal: controller.signal });
		clearTimeout(id);
		return res && res.ok;
	} catch (e) {
		return false;
	}
}

async function detectPackagerHost() {
	try {
		const scriptURL = NativeModules?.SourceCode?.scriptURL || '';
		if (!scriptURL) return null;
		// scriptURL example: http://192.168.0.10:19000/index.bundle?platform=android&...
		const withoutProto = scriptURL.split('://').pop();
		const host = withoutProto.split(':')[0];
		if (!host) return null;
		return `http://${host}:3000`;
	} catch (e) {
		return null;
	}
}

// Try to auto-detect a working API_BASE at runtime (does not block startup)
(async function resolveApiBase() {
	// If build-time production value present, trust it
	if (process.env.EXPO_PUBLIC_API_BASE) return;

	// 1) try last known base
	try {
		const last = await AsyncStorage.getItem(LAST_KEY);
		if (last) {
			const ok = await testPing(last);
			if (ok) {
				API_BASE = last;
				return;
			}
		}
	} catch (e) {
		// ignore
	}

	// 2) try packager-derived host (useful during local dev when device and dev machine share network)
	try {
		const candidate = await detectPackagerHost();
		if (candidate) {
			const ok = await testPing(candidate);
			if (ok) {
				API_BASE = candidate;
				try { await AsyncStorage.setItem(LAST_KEY, candidate); } catch (_) {}
				return;
			}
		}
	} catch (e) {
		// ignore
	}

	// 3) fallback to the static local value (already set)
})();


