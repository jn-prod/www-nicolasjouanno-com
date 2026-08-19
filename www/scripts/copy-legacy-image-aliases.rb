require "fileutils"

image_names = %w[
  77a9b-1fhdbbyabl24dcabgexhpow.webp
  8f833-1glqrdjmo0myyuik5d1idxg.webp
  21d8e-1qcj1veggw6yciebqwl3q7w.webp
  e8b22-11czy1ngfc50mjx7vxlphqa.webp
  74ddb-1utch2gz4b5xfvt2dxhgnvq2x.webp
  0c183-1_g8fkft15lcn-3j_75pfaq.webp
]

image_names.each do |image_name|
  source = File.join("..", "packages", "images", "dist", "posts", image_name)
  abort "Missing legacy image source: #{source}" unless File.file?(source)

  FileUtils.cp(source, File.join("_site", image_name))
end
