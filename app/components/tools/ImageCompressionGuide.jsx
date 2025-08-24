// app/components/tools/ImageCompressionGuide.jsx

export default function ImageCompressionGuide() {
  return (
    <section className="prose prose-neutral dark:prose-invert max-w-none mt-12">
      {/* Intro */}
      <h2>Image Compression: Reduce Image Size Without Losing Quality</h2>
      <p>
        Images make websites engaging, but large files can slow pages, waste
        bandwidth, and even hurt search rankings. The good news is that with a
        few simple steps, you can reduce image file size while keeping them
        sharp and clear.
      </p>

      {/* What is compression */}
      <h3 id="what-is-image-compression">What is image compression?</h3>
      <p>
        Image compression means shrinking the size of an image file while
        keeping it visually appealing.
      </p>
      <ul>
        <li>
          <strong>Lossless compression:</strong> Shrinks file size without
          changing visible quality. Great for icons, logos, and graphics.
        </li>
        <li>
          <strong>Lossy compression:</strong> Makes files much smaller with a
          slight quality trade-off, usually unnoticeable. Ideal for photos.
        </li>
      </ul>

      {/* Why compress */}
      <h3 id="why-reduce-image-size">Why reduce image size?</h3>
      <ol>
        <li>
          <strong>Faster pages:</strong> Speed improves user experience and SEO.
        </li>
        <li>
          <strong>Lower bounce rate:</strong> Visitors stay longer on responsive
          sites.
        </li>
        <li>
          <strong>Saves bandwidth & storage:</strong> Useful for blogs,
          portfolios, and e-commerce.
        </li>
        <li>
          <strong>Mobile friendly:</strong> Optimized images load smoothly on
          phones.
        </li>
      </ol>

      {/* Ways to compress */}
      <h3 id="ways-to-compress">Best ways to compress images</h3>
      <ul>
        <li>
          <strong>Online tools:</strong> Free services like TinyPNG,
          CompressJPEG, or Squoosh make it quick and easy.
        </li>
        <li>
          <strong>Desktop software:</strong> Tools like Photoshop or GIMP offer
          control over quality and size.
        </li>
        <li>
          <strong>CMS plugins:</strong> WordPress and Shopify users can install
          plugins like Smush or ShortPixel for automation.
        </li>
      </ul>

      {/* JPEG section */}
      <h3 id="compress-jpeg">Compress JPEG: the most common need</h3>
      <p>
        JPEGs are the most popular photo format online. A good JPEG compressor
        can reduce a 5MB photo to ~500KB without noticeable loss, making your
        site faster and lighter.
      </p>

      {/* Best practices */}
      <h3 id="best-practices">Best practices</h3>
      <ul>
        <li>Use the right format (JPEG/PNG/WebP/AVIF/SVG).</li>
        <li>Resize dimensions before uploading.</li>
        <li>Preview compressed files before publishing.</li>
        <li>Keep a backup of original images.</li>
      </ul>

      {/* FAQs */}
      <h3 id="faqs">FAQs</h3>
      <details>
        <summary>How do I reduce image size without losing quality?</summary>
        <p>
          Use lossless compression or resize dimensions to what you actually
          need, then compress. Tools like TinyPNG or Squoosh are excellent.
        </p>
      </details>
      <details>
        <summary>What format is best: JPEG, PNG, or WebP?</summary>
        <p>
          JPEG for photos, PNG for graphics with transparency, WebP/AVIF for
          modern lightweight images, and SVG for line art or icons.
        </p>
      </details>
      <details>
        <summary>Does image compression help SEO?</summary>
        <p>
          Yes. Optimized images improve site speed, Core Web Vitals, and search
          visibility.
        </p>
      </details>

      {/* Closing */}
      <h3>Final thoughts</h3>
      <p>
        Start simple: resize and compress. Measure performance, then automate
        where possible. Optimized images help your site load faster, improve
        SEO, and keep visitors engaged.
      </p>
    </section>
  );
}
