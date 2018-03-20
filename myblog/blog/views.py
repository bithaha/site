from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect

from . import models
# Create your views here.

def index(request):
	articles = models.Article.objects.all()
	return render(request, 'blog/index.html',{"articles":articles})


def article_page(request, article_id):
	article = models.Article.objects.get(pk=article_id)
	return render(request, 'blog/article.html', {"article":article})

def add_page(request, article_id):
	if str(article_id) =='0':
		return render(request, 'blog/add.html')

	article = models.Article.objects.get(pk=article_id)
	return render(request, 'blog/add.html', {"article": article})

def edit_action(request):
	title = request.POST.get('title', "TITLE")
	content = request.POST.get('content', 'CONTENT')
	article_id = request.POST.get('article_id','0')

	if article_id == '0':
		models.Article.objects.create(title=title, content=content)
		articles = models.Article.objects.all()
		return HttpResponseRedirect('/blog/index')

	article = models.Article.objects.get(pk=article_id)
	article.title = title
	article.content = content

	article.save()
	return HttpResponseRedirect('/blog/index')