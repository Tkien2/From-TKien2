export async function encryptPassword2(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  console.log(data)
  console.log(hashBuffer)
  console.log(hashArray)
  return hashArray.map(b => b.toString(32).padStart(2, '0')).join('');
}