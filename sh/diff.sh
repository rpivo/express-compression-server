echo "current published version:";
npm show express-compression-server version;
npx publish-diff --filter='{bin,src}/**';
