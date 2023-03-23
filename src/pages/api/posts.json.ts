// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  posts: unknown[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({
	posts : [
	//   {% for post in site.posts %}
  
	// 	  {
	// 		  "title": "{{ post.title }}",
	// 		  "image": "{{ post.image | prepend: '/' | prepend: site.data.config.url }}",
	// 		  "url": "{{ post.url | url_decode | prepend: site.data.config.url }}",
	// 		  "date":"{{ post.date | date_to_string }}",
	// 		  "categories":[
	// 			  {% for category in post.categories %}"{{ category }}"{% unless forloop.last %}, {% endunless %}{% endfor %}
	// 		  ],
	// 		  "summary":{{ post.excerpt | strip_html | truncatewords:30 | escape | smartify | jsonify }},
	// 		  "author": {
	// 			  "name": "{{site.data.authors[post.author].name}}",
	// 			  "avatar": "{{site.data.authors[post.author].avatar}}",
	// 			  "web": "{{site.data.authors[post.author].web}}"
	// 		  }
	// 	  }{% unless forloop.last %},{% endunless %}
		
	//   {% endfor %}
	]
  });
}
