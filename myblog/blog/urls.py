from django.conf.urls import url, include
from . import views;
app_name = 'blog'
urlpatterns = [
	url(r'index/', views.index),
	url(r'^article/(?P<article_id>[\d]+)$', views.article_page, name='article'),
	url(r'^add/(?P<article_id>[\d]+)$', views.add_page, name='article_add'),
	url(r'^add/action$', views.edit_action, name='edit_action'),
]