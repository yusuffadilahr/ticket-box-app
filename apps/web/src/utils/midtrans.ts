export default async function loadSnap(): Promise<typeof window.snap> {
    const snapSrc = 'https://app.sandbox.midtrans.com/snap/snap.js';

    if (typeof window === 'undefined') {
        throw new Error('loadSnap can only be called in the browser.');
    }

    if (!document.querySelector(`script[src="${snapSrc}"]`)) {
        const script = document.createElement('script');
        script.src = snapSrc;
        script.async = true;
        document.body.appendChild(script);

        await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Midtrans Snap script.'));
        });
    }

    if (!window.snap) {
        throw new Error("Failed to load Midtrans Snap.");
    }

    return window.snap;
}