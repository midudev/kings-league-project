export async function checkIsLive() {
	const response = await fetch('https://midudev-apis.midudev.workers.dev/uptime/kingsleague')
	const { online } = await response.json()
	return online
}
