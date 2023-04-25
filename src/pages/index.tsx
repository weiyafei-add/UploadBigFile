import yayJpg from "../assets/yay.jpg";

/**
 * Dose it ever snow in Greece?
 *
 * Where does she come from ?
 * Where do they come from?
 *
 * I come from Greece;
 *
 * What's the climate like in your country?
 *
 * It's very pleasant.
 *
 * What's the weather like in spring?
 *
 * It's often windy in March.
 * It's always warm in April and May, but it rains sometimes.
 *
 * What's it like in summer?
 *
 * It's always hot in June, July and August, The sun shines every day.
 *
 * Is it cold or warm in autumn?
 *
 * It's always warm in September and October.
 * It's often cold in November and it rains sometimes.
 *
 * Is it very cold in winter?
 * It's often cold in December, January and February.
 * It's rains sometimes.
 *
 */

export default function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}
