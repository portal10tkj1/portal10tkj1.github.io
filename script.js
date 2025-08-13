document.addEventListener('DOMContentLoaded', function() {
    // Real-time clock
    function updateClock() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('id-ID', { hour12: false });
        const dateStr = now.toLocaleDateString('id-ID', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        }).toUpperCase();
        
        document.getElementById('real-time').textContent = timeStr;
        document.getElementById('current-date').textContent = dateStr;
    }
    
    setInterval(updateClock, 1000);
    updateClock();
    
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        if (item.getAttribute('data-section')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all nav items
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                // Add active class to clicked nav item
                this.classList.add('active');
                
                // Hide all content sections
                contentSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show selected content section
                const sectionId = this.getAttribute('data-section') + '-section';
                document.getElementById(sectionId).classList.add('active');
            });
        }
    });
    
    // Load today's schedule preview
    function loadTodaySchedule() {
        const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
        const today = new Date().getDay();
        const todayId = days[today];
        
        if (todayId === 'minggu') {
            document.getElementById('today-schedule').innerHTML = '<p>Hari ini adalah hari Minggu. Tidak ada jadwal pelajaran.</p>';
            return;
        }
        
        // Sample schedule data
        const schedules = {
            senin: [
                { time: '13:30 - 14:00', subject: 'Informatika' },
                { time: '14:00 - 14:30', subject: 'Informatika' },
                { time: '14:30 - 15:00', subject: 'Informatika' },
                { time: '15:00 - 15:30', subject: 'Informatika' },
                { time: '15:30 - 16:00', subject: 'Sejarah' },
                { time: '16:30 - 17:00', subject: 'Sejarah' },
                { time: '17:00 - 17:25', subject: 'SBK' }
            ],
            selasa: [
                { time: '13:30 - 14:00', subject: 'OKM' },
                { time: '14:00 - 14:30', subject: 'OKM' },
                { time: '14:30 - 15:00', subject: 'B. Indonesia' },
                { time: '15:00 - 15:30', subject: 'B. Indonesia' },
                { time: '15:30 - 16:00', subject: 'PKN' },
                { time: '16:30 - 17:00', subject: 'PKN' },
                { time: '17:00 - 17:25', subject: 'IPAS' }
            ],
            rabu: [
                { time: '13:30 - 14:00', subject: 'DTKJ 1' },
                { time: '14:00 - 14:30', subject: 'DTKJ 1' },
                { time: '14:30 - 15:00', subject: 'DTKJ 1' },
                { time: '15:00 - 15:30', subject: 'DTKJ 1' },
                { time: '15:30 - 16:00', subject: 'PAI' },
                { time: '16:30 - 17:00', subject: 'PJOK' },
                { time: '17:00 - 17:25', subject: 'PJOK' }
            ],
            kamis: [
                { time: '13:30 - 14:00', subject: 'DTJKT 1' },
                { time: '14:00 - 14:30', subject: 'DTJKT 1' },
                { time: '14:30 - 15:00', subject: 'MM' },
                { time: '15:00 - 15:30', subject: 'MM' },
                { time: '15:30 - 16:00', subject: 'DTJKT 2' },
                { time: '16:30 - 17:00', subject: 'DTJKT 2' },
                { time: '17:00 - 17:25', subject: 'B. Inggris' }
            ],
            jumat: [
                { time: '13:30 - 14:00', subject: 'IPAS' },
                { time: '14:00 - 14:30', subject: 'IPAS' },
                { time: '14:30 - 15:00', subject: 'B. Inggris' },
                { time: '15:00 - 15:30', subject: 'B. Inggris' },
                { time: '15:30 - 16:00', subject: 'MM' },
                { time: '16:30 - 17:00', subject: 'MM' },
                { time: '17:00 - 17:25', subject: 'IPAS' }
            ],
            sabtu: [
                { time: '13:30 - 14:00', subject: 'DTJKT 2' },
                { time: '14:00 - 14:30', subject: 'DTJKT 2' },
                { time: '14:30 - 15:00', subject: 'DTJKT 2' },
                { time: '15:00 - 15:30', subject: 'DTJKT 2' },
                { time: '15:30 - 16:00', subject: 'PAI' },
                { time: '16:30 - 17:00', subject: 'PAI' },
                { time: '17:00 - 17:25', subject: 'B. Indonesia' }
            ]
        };
        
        const todaySchedule = schedules[todayId];
        let html = `<h4 style="color: var(--primary); margin-bottom: 1rem;">JADWAL ${todayId.toUpperCase()}</h4>`;
        
        todaySchedule.forEach(item => {
            html += `
                <div style="display: flex; margin-bottom: 0.5rem;">
                    <div style="width: 120px; font-family: 'Orbitron', sans-serif; font-size: 0.9rem; color: var(--primary);">${item.time}</div>
                    <div>${item.subject}</div>
                </div>
            `;
        });
        
        document.getElementById('today-schedule').innerHTML = html;
    }
    
    // Load gallery images
    function loadGallery() {
        const gallery = [
            {
                image: 'gallery/fotbar.jpg',
                title: 'Foto Bareng',
                date: '13 Agustus 2025'
            },
        ];
        
        let html = '';
        gallery.forEach(item => {
            html += `
                <div class="gallery-item">
                    <img src="${item.image}" alt="${item.title}" class="gallery-img">
                    <div class="gallery-caption">
                        <div class="gallery-title">${item.title}</div>
                        <div class="gallery-date">${item.date}</div>
                    </div>
                </div>
            `;
        });
        
        document.getElementById('class-gallery').innerHTML = html;
    }
    
    // Load birthday data using gallery style
    function loadBirthdays() {
        const birthdays = [
            {
                name: 'Rafli',
                date: '5 Agustus',
                image: 'ultah/rafli.jpg'
            },
        ];
        
        let html = '';
        birthdays.forEach(student => {
            html += `
                <div class="birthday-item">
                    <img src="${student.image}" alt="${student.name}" class="birthday-img">
                    <div class="birthday-caption">
                        <div class="birthday-name">${student.name}</div>
                        <div class="birthday-date">${student.date}</div>
                    </div>
                </div>
            `;
        });
        
        document.getElementById('birthday-grid').innerHTML = html;
    }
    
    // Initialize modal functionality
    function initModal() {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        const modalCaption = document.getElementById('modal-caption');
        const closeModal = document.querySelector('.close-modal');
        
        // Add click event to gallery items
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('gallery-img') || e.target.classList.contains('birthday-img')) {
                modalImg.src = e.target.src;
                modalCaption.textContent = e.target.alt;
                modal.style.display = 'flex';
            }
        });
        
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Initialize all functions
    loadTodaySchedule();
    loadGallery();
    loadBirthdays();
    initModal();
});