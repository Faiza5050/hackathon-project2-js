import { 
    db, 
    auth 
  } from './firebase.js';
  import { 
    collection, 
    query, 
    orderBy, 
    limit, 
    getDocs,
    serverTimestamp
  } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
  
  document.addEventListener('DOMContentLoaded', () => {
    const recentTipsContainer = document.getElementById('recentTips');
    
    if (recentTipsContainer) {
      const q = query(
        collection(db, 'tips'),
        orderBy('createdAt', 'desc'),
        limit(6)
      );
      
      getDocs(q)
        .then(snapshot => {
          if (snapshot.empty) {
            recentTipsContainer.innerHTML = '<p class="text-gray-500 col-span-3 text-center">No tips found. Be the first to share!</p>';
            return;
          }
          
          snapshot.forEach(doc => {
            const tip = doc.data();
            const tipCard = createTipCard(doc.id, tip);
            recentTipsContainer.appendChild(tipCard);
          });
        })
        .catch(err => {
          console.error('Error getting tips: ', err);
        });
    }
  });
  
  function createTipCard(id, tip) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition';
    
    card.innerHTML = `
      ${tip.imageUrl ? `<img src="${tip.imageUrl}" alt="${tip.title}" class="w-full h-48 object-cover">` : ''}
      <div class="p-6">
        <div class="flex justify-between items-start mb-2">
          <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${tip.category}</span>
          <span class="text-gray-500 text-sm">${new Date(tip.createdAt?.toDate()).toLocaleDateString()}</span>
        </div>
        <h3 class="text-xl font-bold mb-2">${tip.title}</h3>
        <p class="text-gray-600 mb-4">${tip.description.substring(0, 100)}${tip.description.length > 100 ? '...' : ''}</p>
        <div class="flex justify-between items-center">
          <a href="tip-detail.html?id=${id}" class="text-blue-600 hover:underline">Read More</a>
          ${tip.externalLink ? `<a href="${tip.externalLink}" target="_blank" class="text-gray-500 hover:text-gray-700"><i class="fas fa-external-link-alt"></i></a>` : ''}
        </div>
      </div>
    `;
    
    return card;
  }
