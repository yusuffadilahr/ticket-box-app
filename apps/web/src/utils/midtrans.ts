export default async function loadSnap() {
    const snapSrc = 'https://app.sandbox.midtrans.com/snap/snap.js';
    if (!document.querySelector(`script[src="${snapSrc}"]`)) {
        const script = document.createElement('script');
        script.src = snapSrc;
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => {
            script.onload = resolve;
        });
    }
    return window.snap;
}
