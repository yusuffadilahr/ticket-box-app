
// export default async function loadSnap(): Promise<typeof window.snap> {
//     const snapSrc = 'https://app.sandbox.midtrans.com/snap/snap.js';
//     if (!document.querySelector(`script[src="${snapSrc}"]`)) {
//         const script = document.createElement('script');
//         script.src = snapSrc;
//         script.async = true;
//         document.body.appendChild(script);
//         await new Promise<void>((resolve) => {
//             script.onload = () => resolve();
//         });
//     }

//     if (!window.snap) {
//         throw new Error("Failed to load Midtrans Snap.");
//     }

//     return window.snap;
// }

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
