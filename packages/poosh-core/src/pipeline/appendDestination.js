import join from "poosh-common/lib/url/join";
import fromPath from "poosh-common/lib/url/fromPath";

export default function appendDestination (file: Object, base: string) {
  file.dest.base = base;
  file.dest.relative = fromPath(file.src.relative);
  file.dest.absolute = join(file.dest.base, file.dest.relative);
}
