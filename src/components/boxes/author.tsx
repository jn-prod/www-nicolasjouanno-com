export default function Author() {
    return <div className="d-flex mb-3 px-5">
            <div className="d-inline">
                <img className="img-fluid mx-auto d-inline" src={ author.avatar } alt={ site.data.authors.nicolas.display_name }, {{ site.data.authors.nicolas.current_job }}" style="max-height: 90px; width: auto;" />
                <meta itemProp="author creator" content="{{ author.display_name }}" />
            </div>
            <div className="d-inline my-auto ml-3 text-muted">

                <div className="d-block">
                    <span itemProp="publisher" itemScope itemType="http://schema.org/Organization">
                        <span itemProp="name" className="font-weight-bold text-dark d-inline">Par {{ author.display_name }},</span>
                        
                        {% if page.date %}
                            <span className="post-date">
                                le 
                                {% if page.layout == "post" %}
                                    <time>{{ page.date | date_to_string }}</time>
                                {% else %}
                                    <time className="" itemProp="dateCreated datePublished dateModified" datetime="{{ page.date | date:"%Y-%m-%d" }}">{{ page.date | date_to_string }}</time>
                                {% endif %}
                            </span>
                        {% endif %} 

                        <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
                            <meta itemProp="url" content="{{ site.data.config.url }}/{{ site.logo }}">
                            <meta itemProp="width" content="60">
                            <meta itemProp="height" content="60">
                        </span>
                        <meta itemProp="url" content="{{site.data.config.url}}">
                    </span>                
                </div>

                <div>
                    <a target="_blank" className="link-dark ml-1" href="{{ author.linkedin }}/" rel="me">
                    <span className="fab fa-linkedin"></span>
                    </a>
                </div>            
            </div>
        </div>
            </div>
        </div>
    </div>
}
