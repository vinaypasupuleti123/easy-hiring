import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tutorials',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="min-h-screen bg-white">
      <!-- Top banner for Tutorials -->
      <div class="bg-gray-900 py-12 text-center text-white border-b-4 border-gfg-green">
         <h1 class="text-4xl font-extrabold mb-4 tracking-tight">Technical Tutorials library</h1>
         <p class="text-gray-400 text-lg max-w-2xl mx-auto">Learn new concepts through our well-structured, comprehensive, and widely appreciated articles.</p>
         
         <div class="mt-8 max-w-lg mx-auto flex items-center bg-white rounded-lg p-1">
             <input type="text" placeholder="Search for any tutorial..." class="flex-grow text-gray-800 bg-transparent py-3 px-4 focus:outline-none placeholder-gray-400 w-full" />
             <button class="bg-gfg-green text-white hover:bg-gfg-dark font-bold py-3 px-6 rounded-md transition-colors">Search</button>
         </div>
      </div>

      <!-- Main Layout -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-10">
         
         <!-- Left Sidebar Navigation -->
         <aside class="md:w-1/4 flex-shrink-0">
            <h2 class="text-xl font-extrabold text-gray-900 mb-6 uppercase tracking-wider">Categories</h2>
            <nav class="space-y-1">
               <a href="#" class="flex items-center justify-between text-gfg-green bg-green-50 px-4 py-3 rounded-md font-bold text-sm">
                   Data Structures
                   <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
               </a>
               <a href="#" class="flex items-center justify-between text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-md font-medium text-sm transition-colors">
                   Algorithms
               </a>
               <a href="#" class="flex items-center justify-between text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-md font-medium text-sm transition-colors">
                   Languages (C++, Java, Python)
               </a>
               <a href="#" class="flex items-center justify-between text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-md font-medium text-sm transition-colors">
                   Web Technologies
               </a>
               <a href="#" class="flex items-center justify-between text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-md font-medium text-sm transition-colors">
                   Machine Learning
               </a>
               <a href="#" class="flex items-center justify-between text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-md font-medium text-sm transition-colors">
                   System Design
               </a>
            </nav>
         </aside>

         <!-- Right Content Area -->
         <main class="md:w-3/4">
            <div class="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <h2 class="text-3xl font-extrabold text-gray-900 border-l-4 border-gfg-green pl-4">Data Structures</h2>
            </div>
            
            <p class="text-gray-600 text-lg mb-8 leading-relaxed">
               A data structure is a particular way of organizing data in a computer so that it can be used effectively. 
               We provide comprehensive coverage of all data structures starting from arrays and linked lists to advanced segment trees and tries.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Tutorial Card -->
                <div class="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer bg-white group">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg font-bold text-xl mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">[ ]</div>
                        <h3 class="text-xl font-bold text-gray-900">Arrays</h3>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">An array is a collection of items stored at contiguous memory locations...</p>
                    <a href="#" class="text-gfg-green font-bold text-sm uppercase flex items-center hover:underline">Start Learning <svg class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>
                </div>

                <!-- Tutorial Card -->
                <div class="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer bg-white group">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-lg font-bold text-xl mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">○-○</div>
                        <h3 class="text-xl font-bold text-gray-900">Linked List</h3>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">A linked list is a linear data structure, in which the elements are not stored at contiguous...</p>
                    <a href="#" class="text-gfg-green font-bold text-sm uppercase flex items-center hover:underline">Start Learning <svg class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>
                </div>

                <!-- Tutorial Card -->
                <div class="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer bg-white group">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-lg font-bold text-xl mr-4 group-hover:bg-green-600 group-hover:text-white transition-colors">▤</div>
                        <h3 class="text-xl font-bold text-gray-900">Stack</h3>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">A stack is a linear data structure that follows a particular order LIFO...</p>
                    <a href="#" class="text-gfg-green font-bold text-sm uppercase flex items-center hover:underline">Start Learning <svg class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>
                </div>
                
                 <!-- Tutorial Card -->
                <div class="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer bg-white group">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-lg font-bold text-xl mr-4 group-hover:bg-yellow-600 group-hover:text-white transition-colors">▦</div>
                        <h3 class="text-xl font-bold text-gray-900">Queue</h3>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">A Queue is a linear structure which follows a particular order FIFO...</p>
                    <a href="#" class="text-gfg-green font-bold text-sm uppercase flex items-center hover:underline">Start Learning <svg class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>
                </div>
                
                 <!-- Tutorial Card -->
                 <div class="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer bg-white group">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-red-100 text-red-600 flex items-center justify-center rounded-lg font-bold text-xl mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors">🌲</div>
                        <h3 class="text-xl font-bold text-gray-900">Binary Tree</h3>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">A tree whose elements have at most 2 children is called a binary tree...</p>
                    <a href="#" class="text-gfg-green font-bold text-sm uppercase flex items-center hover:underline">Start Learning <svg class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>
                </div>

                <!-- Tutorial Card -->
                <div class="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer bg-white group">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-gray-100 text-gray-800 flex items-center justify-center rounded-lg font-bold text-xl mr-4 group-hover:bg-gray-800 group-hover:text-white transition-colors">🕸️</div>
                        <h3 class="text-xl font-bold text-gray-900">Graph</h3>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">A Graph is a non-linear data structure consisting of vertices and edges...</p>
                    <a href="#" class="text-gfg-green font-bold text-sm uppercase flex items-center hover:underline">Start Learning <svg class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>
                </div>
            </div>
            
         </main>
      </div>
    </div>
  `
})
export class TutorialsComponent {
}
