"""Validate the deployable route graph, local assets and structured product data."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
root=Path('out'); problems=[]; count=0
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.refs=[];self.jsons=[];self.injson=False;self.h1=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if tag in ('a','link','img','script'):
   ref=a.get('href') or a.get('src')
   if ref:self.refs.append(ref)
  if tag=='script' and a.get('type')=='application/ld+json':self.injson=True
 def handle_endtag(self,tag):
  if tag=='script':self.injson=False
 def handle_data(self,data):
  if self.injson:self.jsons.append(json.loads(data))
for file in root.rglob('*.html'):
 page=Page();page.feed(file.read_text());count+=1
 for ref in page.refs:
  if not ref.startswith('/') or ref.startswith('//'):continue
  path=unquote(urlsplit(ref).path).lstrip('/');dest=root/path
  if not dest.exists() and not dest.with_suffix('.html').exists():problems.append(f'{file}: missing {ref}')
 if '/collection/the-' in str(file):
  graphs=[item for graph in page.jsons for item in graph.get('@graph',[])]
  product=next((x for x in graphs if x.get('@type')=='Product'),None)
  if not product or product['offers']['availability']!='https://schema.org/OutOfStock':problems.append(f'{file}: product schema must reflect closed orders')
 if file.name=='index.html' and page.h1!=1:problems.append(f'{file}: expected one h1, got {page.h1}')
if problems:raise SystemExit('\n'.join(problems))
print(f'PASS: {count} exported HTML documents; local links/assets, product schema and heading checks.')
