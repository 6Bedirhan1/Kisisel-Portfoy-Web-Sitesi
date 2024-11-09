function toggleBio() {
    const longBio = document.getElementById('longBio');
    const toggleButton = document.getElementById('toggleButton');

    if (longBio && toggleButton) {
        if (longBio.classList.contains('hidden')) {
            longBio.classList.remove('hidden');
            toggleButton.textContent = 'Daha Az Gör';
        } else {
            longBio.classList.add('hidden');
            toggleButton.textContent = 'Daha Fazla Gör';
        }
    }
}

// Anasayfaya Git Fonksiyonu
function goHome() {
    window.location.href = "index.html"; // Anasayfa URL'sine yönlendirme
}

document.addEventListener('DOMContentLoaded', function () {
    // Dinamik Saat/Tarih Gösterme
    function updateTime() {
        const now = new Date();
        const dateTimeElement = document.getElementById('date-time');
        if (dateTimeElement) { // Eğer öğe varsa
            dateTimeElement.textContent = now.toLocaleString('tr-TR');
        }
    }

    // Her saniyede bir zamanı güncelle
    setInterval(updateTime, 1000);
    updateTime(); // İlk sayfa açılışında hemen göster

    // Scroll ile iletişim kısmını görünür yapma
    window.addEventListener('scroll', function() {
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) { // Eğer iletişim kısmı varsa
            const sectionPosition = contactSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            if (sectionPosition < screenPosition) {
                contactSection.classList.add('visible');
            }
        }
    });

    // Form Doğrulama
    const form = document.getElementById('contactForm');
    if (form) { // Form varsa
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Formun gönderilmesini durdurur  

            // Form alanlarını al
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // E-posta formatını kontrol etme
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Lütfen geçerli bir e-posta adresi girin.');
                return;
            }

            // Tüm alanların doldurulduğunu kontrol etme
            if (name === '' || email === '' || message === '') {
                alert('Lütfen tüm alanları doldurun.');
                return;
            }

            // Doğrulama başarılıysa kullanıcıya bir mesaj göster
            alert('Form başarıyla gönderildi!');
        });
    }


    // Proje Filtreleme
    const filterButtons = document.querySelectorAll('#filter-buttons button');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const filter = button.textContent; // Butonun metnini alıyoruz (örn. "Tüm Projeler")

                // Filtreye göre projeleri göster veya gizle
                projectItems.forEach(project => {
                    if (filter === 'Tüm Projeler') {
                        // "Tüm Projeler" seçildiğinde, hepsi görünsün
                        project.style.display = 'block';
                    } else if (filter === 'En Son Projeler') {
                        // "En Son Projeler" seçildiğinde sadece belirli projeler görünsün
                        if (project.id === 'project1' || project.id === 'project3' || project.id === 'project5' || project.id === 'project6') {
                            project.style.display = 'block';
                        } else {
                            project.style.display = 'none';
                        }
                    } else if (filter === 'En Beğenilen Projeler') {
                        // "En Beğenilen Projeler" seçildiğinde sadece belirli projeler görünsün
                        if (project.id === 'project2' || project.id === 'project4' || project.id === 'project6') {
                            project.style.display = 'block';
                        } else {
                            project.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
});


// Modal elementi
const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close');

// Modal ve kapatma butonu mevcutsa işlemleri gerçekleştir
if (modal && closeModal) {
    // Proje kartlarına tıklama olaylarını ekleme
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src; // Proje resmini alıyoruz
            const description = this.querySelector('p').textContent; // Proje açıklamasını kullanıyoruz

            modalImg.src = imgSrc; // Modal içindeki resme bu resmi koyuyoruz
            modalDescription.textContent = description; // Açıklamayı modal içine koyuyoruz

            modal.style.display = 'block'; // Modalı görünür yapıyoruz
        });
    });

    // Modalı kapatma (X işaretine tıklandığında)
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Modal dışına tıklanırsa da kapatma
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
